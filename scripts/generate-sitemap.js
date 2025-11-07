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
    docs: 0.9,
    principles: 0.8,
    metadata: 0.8,
    manuals: 0.8,
    cicd: 0.8,
    glossary: 0.7,
    other: 0.6,
    // Служебные страницы
    404: 0.1,
    search: 0.1,
  },
  // Как часто обновляются разные типы страниц
  changefreq: {
    index: 'weekly',
    docs: 'weekly',
    principles: 'monthly',
    metadata: 'monthly',
    manuals: 'monthly',
    cicd: 'weekly',
    glossary: 'monthly',
    other: 'monthly',
    404: 'yearly',
    search: 'never',
  },
};

// Нормализуем путь для URL
const normalizePath = (filePath) => {
  // Убираем расширение .html
  let normalized = filePath.replace(/\.html$/, '');

  // index.html -> /
  if (normalized === 'index' || normalized.endsWith('/index')) {
    normalized = normalized.replace(/\/?index$/, '') || '/';
  }

  // Заменяем обратные разделители на прямые (для Windows)
  normalized = normalized.replace(/\\/g, '/');

  // Убираем начальный разделитель, если он есть (кроме корня)
  if (normalized !== '/' && normalized.startsWith('/')) {
    normalized = normalized.substring(1);
  }

  // Добавляем разделитель в конец для директорий (кроме корня)
  if (normalized && normalized !== '/' && !normalized.includes('.')) {
    normalized = normalized + '/';
  }

  return normalized;
};

// Получаем все HTML файлы из build директории
const getPages = () => {
  const files = glob.sync('build/**/*.html', {
    ignore: ['**/404.html', '**/search.html'], // Игнорируем служебные страницы
  });

  return files
    .map((file) => {
      const relativePath = file.replace('build/', '');
      const normalizedPath = normalizePath(relativePath);
      const stats = fs.statSync(file);

      return {
        originalPath: relativePath,
        path: normalizedPath,
        priority: getPriority(normalizedPath, relativePath),
        changefreq: getChangefreq(normalizedPath, relativePath),
        lastmod: stats.mtime.toISOString().split('T')[0], // Формат YYYY-MM-DD
      };
    })
    .filter((page) => {
      // Фильтруем служебные страницы
      return !page.path.includes('404') && !page.path.includes('search');
    })
    .sort((a, b) => {
      // Сортируем: сначала главная, потом по алфавиту
      if (a.path === '/') return -1;
      if (b.path === '/') return 1;
      return a.path.localeCompare(b.path);
    });
};

// Определяем приоритет страницы
const getPriority = (normalizedPath, originalPath) => {
  const pathLower = normalizedPath.toLowerCase();
  const originalLower = originalPath.toLowerCase();

  if (normalizedPath === '/') return CONFIG.priorities.index;
  if (pathLower.includes('principles') || originalLower.includes('principles'))
    return CONFIG.priorities.principles;
  if (pathLower.includes('metadata') || originalLower.includes('metadata'))
    return CONFIG.priorities.metadata;
  if (pathLower.includes('manuals') || originalLower.includes('manuals'))
    return CONFIG.priorities.manuals;
  if (pathLower.includes('cicd') || originalLower.includes('cicd')) return CONFIG.priorities.cicd;
  if (pathLower.includes('glossary') || originalLower.includes('glossary'))
    return CONFIG.priorities.glossary;
  if (pathLower.includes('docs') || originalLower.includes('docs')) return CONFIG.priorities.docs;

  return CONFIG.priorities.other;
};

// Определяем частоту обновления
const getChangefreq = (normalizedPath, originalPath) => {
  const pathLower = normalizedPath.toLowerCase();
  const originalLower = originalPath.toLowerCase();

  if (normalizedPath === '/') return CONFIG.changefreq.index;
  if (pathLower.includes('principles') || originalLower.includes('principles'))
    return CONFIG.changefreq.principles;
  if (pathLower.includes('metadata') || originalLower.includes('metadata'))
    return CONFIG.changefreq.metadata;
  if (pathLower.includes('manuals') || originalLower.includes('manuals'))
    return CONFIG.changefreq.manuals;
  if (pathLower.includes('cicd') || originalLower.includes('cicd')) return CONFIG.changefreq.cicd;
  if (pathLower.includes('glossary') || originalLower.includes('glossary'))
    return CONFIG.changefreq.glossary;
  if (pathLower.includes('docs') || originalLower.includes('docs')) return CONFIG.changefreq.docs;

  return CONFIG.changefreq.other;
};

// Генерируем XML
const generateSitemapXml = (pages) => {
  const urls = pages
    .map((page) => {
      const url = page.path === '/' ? CONFIG.baseUrl + '/' : `${CONFIG.baseUrl}/${page.path}`;

      return `
    <url>
      <loc>${url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
      <lastmod>${page.lastmod}</lastmod>
    </url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

  return prettier.format(sitemap, { parser: 'html', printWidth: 120 });
};

// Основная функция
async function main() {
  try {
    if (!fs.existsSync('build')) {
      console.error('❌ Директория build не найдена. Сначала выполните сборку проекта.');
      process.exit(1);
    }

    const pages = getPages();
    console.log(`📄 Найдено ${pages.length} страниц для добавления в sitemap`);

    const xml = await generateSitemapXml(pages);
    fs.writeFileSync('build/sitemap.xml', xml);

    console.log(`✅ Sitemap успешно сгенерирован: build/sitemap.xml`);
    console.log(`📊 Статистика:`);
    console.log(`   - Всего URL: ${pages.length}`);
    console.log(`   - Главная страница: ${pages.find((p) => p.path === '/') ? 'да' : 'нет'}`);
  } catch (error) {
    console.error('❌ Ошибка при генерации sitemap:', error);
    process.exit(1);
  }
}

main().catch(console.error);
