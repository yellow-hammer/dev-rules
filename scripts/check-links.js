const { LinkChecker } = require('linkinator');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const buildDir = path.join(__dirname, '..', 'build');
// Получаем канонический путь для buildDir для защиты от path traversal
let canonicalBuildDir;
if (!fs.existsSync(buildDir)) {
  console.error('❌ Ошибка: директория build не найдена. Сначала выполните сборку: npm run build');
  process.exit(1);
}
canonicalBuildDir = fs.realpathSync(buildDir);
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
  if (fs.existsSync(safePath)) {
    filePath = fs.realpathSync(safePath);

    // Проверяем, что файл действительно находится внутри canonicalBuildDir
    // используя path.relative для защиты от path traversal
    const relativePath = path.relative(canonicalBuildDir, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
  } else if (!req.url.startsWith('/') || req.url.includes('.')) {
    // Если файл не существует и это не SPA маршрутизация, возвращаем 404
    res.writeHead(404);
    res.end('Not Found');
    return;
  } else {
    // Если файл не существует, пробуем index.html для SPA маршрутизации
    filePath = indexPath;
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

// Запускаем проверку ссылок
async function checkLinks() {
  console.log(`🔍 Начинаю проверку ссылок в собранном сайте...`);
  console.log(`   Директория сборки: ${buildDir}`);
  console.log(`   Локальный сервер: ${BASE_URL}\n`);

  const checker = new LinkChecker();

  // Счётчики для статистики
  let totalLinks = 0;
  let checkedLinks = 0;
  let skippedLinks = 0;

  // Отслеживаем прогресс
  checker.on('link', (result) => {
    // Пропускаем локальные ссылки в статистике внешних
    const isLocal =
      result.url.startsWith(BASE_URL) ||
      result.url.includes('localhost') ||
      result.url.includes('127.0.0.1');

    if (isLocal) {
      skippedLinks++;
      return;
    }

    totalLinks++;

    if (result.state === 'OK') {
      checkedLinks++;
      console.log(`✓ ${result.url} (${result.status})`);
    }
  });

  try {
    const result = await checker.check({
      path: BASE_URL,
      recurse: true,
      concurrency: 2, // Уменьшено для снижения вероятности rate limiting от GitHub
      timeout: 30000,
      linksToSkip: [
        // Исключаем домен, который уже исключен в lychee
        /myblog-1c\.ru/,
        // Исключаем mailto, tel и javascript ссылки
        /^mailto:/,
        /^tel:/,
        /^javascript:/,
      ],
    });

    // Фильтруем только внешние битые ссылки
    // Код 429 (Too Many Requests) не считаем битой ссылкой — это rate limiting
    const brokenLinks = result.links.filter((link) => {
      const isExternal =
        !link.url.startsWith(BASE_URL) &&
        !link.url.includes('localhost') &&
        !link.url.includes('127.0.0.1') &&
        (link.url.startsWith('http://') || link.url.startsWith('https://'));

      // Игнорируем 429 (rate limiting) — это не битая ссылка
      const isRateLimited = link.status === 429;

      return link.state === 'BROKEN' && isExternal && !isRateLimited;
    });

    // Отдельно выводим ссылки с rate limiting для информации
    const rateLimitedLinks = result.links.filter(
      (link) => link.status === 429 && link.state === 'BROKEN'
    );
    if (rateLimitedLinks.length > 0) {
      console.log(`\n⚠️  Rate limited ссылок (код 429): ${rateLimitedLinks.length}`);
      console.log(`   Эти ссылки не считаются битыми — GitHub ограничил количество запросов.`);
    }

    console.log(`\n📊 Результаты проверки ссылок:`);
    console.log(`   Всего внешних ссылок: ${totalLinks}`);
    console.log(`   Проверено: ${checkedLinks}`);
    console.log(`   Пропущено (локальные): ${skippedLinks}`);
    console.log(`   Битых ссылок: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
      console.log(`\n❌ Найдены битые ссылки:\n`);
      for (const link of brokenLinks) {
        console.log(`   - ${link.url}`);
        console.log(`     Статус: ${link.status || link.failureDetails?.message || 'Unknown'}`);
        if (link.parent) {
          console.log(`     На странице: ${link.parent}\n`);
        } else {
          console.log('');
        }
      }
      return 1;
    } else {
      console.log(`\n✅ Все внешние ссылки работают корректно!`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Ошибка при проверке ссылок:`, error.message);
    return 1;
  }
}

// Запускаем сервер и проверку
server.listen(PORT, async () => {
  // Даем серверу немного времени на запуск
  await new Promise((resolve) => setTimeout(resolve, 500));

  const exitCode = await checkLinks();
  server.close();
  process.exit(exitCode);
});
