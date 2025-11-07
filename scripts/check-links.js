const blc = require('broken-link-checker');
const http = require('http');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
// Получаем канонический путь для buildDir для защиты от path traversal
let canonicalBuildDir;
try {
  canonicalBuildDir = fs.realpathSync(buildDir);
} catch (e) {
  console.error('❌ Ошибка: директория build не найдена. Сначала выполните сборку: npm run build');
  process.exit(1);
}
const indexPath = path.join(canonicalBuildDir, 'index.html');
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

if (!fs.existsSync(indexPath)) {
  console.error(
    '❌ Ошибка: файл build/index.html не найден. Сначала выполните сборку: npm run build'
  );
  process.exit(1);
}

// Создаем простой HTTP сервер для обслуживания статических файлов
const server = http.createServer((req, res) => {
  // Build the raw path from URL
  let rawPath = req.url === '/' ? 'index.html' : req.url;
  // Remove query string and fragment
  rawPath = rawPath.split('?')[0].split('#')[0];

  // Нормализуем путь и защищаемся от path traversal
  // Убираем начальный слэш и нормализуем путь
  const normalizedPath = path.normalize(rawPath.replace(/^\/+/, ''));

  // Проверяем, что путь не содержит опасные последовательности
  if (normalizedPath.includes('..') || path.isAbsolute(normalizedPath)) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  // Строим безопасный путь внутри buildDir
  const safePath = path.join(canonicalBuildDir, normalizedPath);

  // Получаем канонический путь для защиты от симлинков
  let filePath;
  try {
    filePath = fs.realpathSync(safePath);

    // Проверяем, что файл действительно находится внутри canonicalBuildDir
    // используя path.relative для защиты от path traversal
    const relativePath = path.relative(canonicalBuildDir, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
  } catch (e) {
    // Если файл не существует, пробуем index.html для SPA роутинга
    if (req.url.startsWith('/') && !req.url.includes('.')) {
      filePath = indexPath;
    } else {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };

  const contentType = contentTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

// Настройки для broken-link-checker
const options = {
  filterLevel: 3, // Проверять все ссылки
  honorRobotsTxt: true,
  maxSockets: 1,
  maxSocketsPerHost: 1,
  requestMethod: 'GET',
  userAgent: 'Mozilla/5.0 (compatible; BrokenLinkChecker/0.7.8)',
  excludedKeywords: [
    'myblog-1c.ru', // Исключаем домен, который уже исключен в lychee
  ],
  excludedSchemes: ['mailto:', 'tel:', 'javascript:'],
};

let brokenLinks = [];
let totalLinks = 0;
let checkedLinks = 0;
let skippedLinks = 0;

const siteChecker = new blc.SiteChecker(options, {
  link: (result) => {
    const originalUrl = result.url.original || '';
    const resolvedUrl = result.url.resolved || '';

    // Пропускаем локальные ссылки:
    // - относительные пути (начинаются с /)
    // - ссылки на localhost
    // - ссылки на 127.0.0.1
    // - ссылки на текущий локальный сервер
    const isLocal =
      originalUrl.startsWith('/') ||
      originalUrl.startsWith(BASE_URL) ||
      resolvedUrl.includes('localhost') ||
      resolvedUrl.includes('127.0.0.1') ||
      resolvedUrl.startsWith(BASE_URL);

    if (isLocal) {
      skippedLinks++;
      return;
    }

    // Проверяем только внешние ссылки (http/https, но не localhost)
    const isExternal =
      (originalUrl.startsWith('http://') || originalUrl.startsWith('https://')) &&
      !originalUrl.includes('localhost') &&
      !originalUrl.includes('127.0.0.1');

    if (!isExternal) {
      skippedLinks++;
      return;
    }

    totalLinks++;
    if (result.broken) {
      brokenLinks.push({
        url: result.url.resolved,
        statusCode: result.http?.statusCode,
        brokenReason: result.brokenReason,
      });
      console.error(
        `❌ Битая ссылка: ${result.url.resolved} (${result.http?.statusCode || result.brokenReason})`
      );
    } else if (result.http?.statusCode) {
      checkedLinks++;
      if (result.http.statusCode >= 200 && result.http.statusCode < 300) {
        console.log(`✓ ${result.url.resolved} (${result.http.statusCode})`);
      }
    }
  },
  page: (error, pageUrl) => {
    if (error) {
      console.error(`❌ Ошибка при проверке страницы ${pageUrl}:`, error.message);
    }
  },
  site: (error) => {
    server.close();

    if (error) {
      console.error(`❌ Ошибка при проверке сайта:`, error.message);
      process.exit(1);
    } else {
      console.log(`\n📊 Результаты проверки ссылок:`);
      console.log(`   Всего внешних ссылок: ${totalLinks}`);
      console.log(`   Проверено: ${checkedLinks}`);
      console.log(`   Пропущено (локальные): ${skippedLinks}`);
      console.log(`   Битых ссылок: ${brokenLinks.length}`);

      if (brokenLinks.length > 0) {
        console.log(`\n❌ Найдены битые ссылки:\n`);
        brokenLinks.forEach((link) => {
          console.log(`   - ${link.url}`);
          console.log(`     Статус: ${link.statusCode || link.brokenReason}\n`);
        });
        process.exit(1);
      } else {
        console.log(`\n✅ Все внешние ссылки работают корректно!`);
        process.exit(0);
      }
    }
  },
});

// Запускаем сервер и проверку
server.listen(PORT, () => {
  console.log(`🔍 Начинаю проверку ссылок в собранном сайте...`);
  console.log(`   Директория сборки: ${buildDir}`);
  console.log(`   Локальный сервер: ${BASE_URL}\n`);

  // Даем серверу немного времени на запуск
  setTimeout(() => {
    siteChecker.enqueue(`${BASE_URL}/`);
  }, 500);
});
