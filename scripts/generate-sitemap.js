const fs = require('fs');
const path = require('path');
const glob = require('glob');
const prettier = require('prettier');

// Конфигурация
const CONFIG = {
  baseUrl: 'https://yellow-hammer.github.io/dev-rules',
  // Приоритеты для разных типов страниц
  priorities: {
    index: 1.0,
    docs: 0.8,
    glossary: 0.7,
    other: 0.5,
  },
  // Как часто обновляются разные типы страниц
  changefreq: {
    index: 'weekly',
    docs: 'weekly',
    glossary: 'monthly',
    other: 'monthly',
  },
};

// Получаем все HTML файлы из build директории
const getPages = () => {
  return glob.sync('build/**/*.html').map((file) => {
    const relativePath = file.replace('build/', '');
    return {
      path: relativePath,
      // Определяем приоритет и частоту обновления на основе пути
      priority: getPriority(relativePath),
      changefreq: getChangefreq(relativePath),
    };
  });
};

// Определяем приоритет страницы
const getPriority = (path) => {
  if (path === 'index.html') return CONFIG.priorities.index;
  if (path.startsWith('docs/')) return CONFIG.priorities.docs;
  if (path.includes('glossary')) return CONFIG.priorities.glossary;
  return CONFIG.priorities.other;
};

// Определяем частоту обновления
const getChangefreq = (path) => {
  if (path === 'index.html') return CONFIG.changefreq.index;
  if (path.startsWith('docs/')) return CONFIG.changefreq.docs;
  if (path.includes('glossary')) return CONFIG.changefreq.glossary;
  return CONFIG.changefreq.other;
};

// Генерируем XML
const generateSitemapXml = (pages) => {
  const urls = pages
    .map(
      (page) => `
    <url>
      <loc>${CONFIG.baseUrl}/${page.path}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `
    )
    .join('');

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `;

  return prettier.format(sitemap, { parser: 'html' });
};

// Основная функция
async function main() {
  const pages = getPages();
  const xml = await generateSitemapXml(pages);
  fs.writeFileSync('build/sitemap.xml', xml);
  console.log('✅ Sitemap generated successfully');
}

main().catch(console.error);
