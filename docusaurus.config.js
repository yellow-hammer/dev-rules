// @ts-check

const { themes: prismThemes } = require('prism-react-renderer');

const site = {
  title: 'Соглашение о разработке',
  tagline: 'Набор практик и стандартов для качественной разработки в 1С',
  url: 'https://yellow-hammer.github.io',
  baseUrl: '/dev-rules/',
  organizationName: 'yellow-hammer',
  projectName: 'dev-rules',
};

const siteBaseUrl = `${site.url}${site.baseUrl}`;
const repositoryUrl = 'https://github.com/yellow-hammer/dev-rules';
const organizationUrl = 'https://github.com/yellow-hammer';
const telegramUrl = 'https://t.me/YellowHummer';

const assets = {
  favicon: 'img/icon.ico',
  ogImage: 'img/og-image.png',
  manifest: `${site.baseUrl}manifest.json`,
  appleTouchIcon: `${site.baseUrl}img/icon.ico`,
  browserConfig: `${site.baseUrl}browserconfig.xml`,
};

const themeColor = '#ffd700';
const siteDescription =
  'Набор практик и стандартов для качественной разработки в 1С. Стандарты кодирования, лучшие практики, инструменты разработки и DevOps процессы.';
const siteKeywords =
  '1С, разработка, стандарты, кодирование, лучшие практики, DevOps, документация, программирование';
const ogImageAlt =
  'Соглашение о разработке - Набор практик и стандартов для качественной разработки в 1С';

const absoluteUrl = (path) => new URL(path, siteBaseUrl).toString();

const metadata = [
  { name: 'description', content: siteDescription },
  { name: 'keywords', content: siteKeywords },
  { name: 'author', content: 'Yellow Hammer' },
  { name: 'robots', content: 'index, follow' },
  { name: 'language', content: 'ru' },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: site.title },
  { property: 'og:locale', content: 'ru_RU' },
  { property: 'og:url', content: siteBaseUrl },
  { property: 'og:image', content: absoluteUrl(assets.ogImage) },
  { property: 'og:image:width', content: '256' },
  { property: 'og:image:height', content: '256' },
  { property: 'og:image:type', content: 'image/png' },
  { property: 'og:image:alt', content: ogImageAlt },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: '@YellowHummer' },
  { name: 'twitter:creator', content: '@YellowHummer' },
  { name: 'twitter:image', content: absoluteUrl(assets.ogImage) },
  { name: 'twitter:image:alt', content: ogImageAlt },
  { name: 'twitter:domain', content: 'yellow-hammer.github.io' },
  { property: 'article:publisher', content: organizationUrl },
  { property: 'article:author', content: 'Yellow Hammer' },
  { property: 'article:section', content: 'Technology' },
  { property: 'article:tag', content: '1С, разработка, стандарты' },
  {
    name: 'viewport',
    content:
      'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover',
  },
  { name: 'theme-color', content: themeColor },
  { name: 'msapplication-TileColor', content: themeColor },
  { name: 'msapplication-config', content: assets.browserConfig },
  { name: 'referrer', content: 'strict-origin-when-cross-origin' },
  { name: 'format-detection', content: 'telephone=no' },
  { name: 'application-name', content: site.title },
  { name: 'mobile-web-app-capable', content: 'yes' },
];

const colorMode = {
  defaultMode: 'light',
  respectPrefersColorScheme: false,
};

const mermaid = {
  theme: {
    light: 'neutral',
    dark: 'neutral',
  },
};

const navbarItems = [
  {
    type: 'doc',
    docId: 'begin',
    position: 'left',
    label: 'Начало',
  },
  {
    type: 'search',
    position: 'right',
  },
  {
    href: 'https://deepwiki.com/yellow-hammer/dev-rules',
    label: 'DeepWiki',
    position: 'right',
  },
  {
    href: repositoryUrl,
    label: 'GitHub',
    position: 'right',
  },
];

const footerLinks = [
  {
    title: 'Сообщество',
    items: [
      {
        label: 'Отправить отзыв',
        href: `${repositoryUrl}/issues`,
      },
      {
        label: 'Предложить изменения',
        href: `${repositoryUrl}/pulls`,
      },
    ],
  },
  {
    title: 'Больше информации',
    items: [
      {
        label: 'Журнал изменений',
        href: `${repositoryUrl}/blob/main/CHANGELOG.md`,
      },
      {
        label: 'Telegram',
        href: telegramUrl,
      },
    ],
  },
  {
    title: 'Юридическая информация',
    items: [
      {
        label: 'Лицензия',
        href: `${repositoryUrl}/blob/main/LICENSE`,
      },
    ],
  },
];

const headTags = [
  {
    tagName: 'link',
    attributes: {
      rel: 'manifest',
      href: assets.manifest,
    },
  },
  {
    tagName: 'link',
    attributes: {
      rel: 'apple-touch-icon',
      href: assets.appleTouchIcon,
    },
  },
  {
    tagName: 'meta',
    attributes: {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
  },
  {
    tagName: 'meta',
    attributes: {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
  },
  {
    tagName: 'meta',
    attributes: {
      name: 'apple-mobile-web-app-title',
      content: 'Dev Rules',
    },
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.title,
  alternateName: 'Dev Rules',
  url: siteBaseUrl,
  description: site.tagline,
  inLanguage: 'ru-RU',
  publisher: {
    '@type': 'Organization',
    name: 'Yellow Hammer',
    url: organizationUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(assets.ogImage),
    },
    sameAs: [organizationUrl, telegramUrl],
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteBaseUrl}search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  mainEntity: {
    '@type': 'DocumentationSite',
    name: 'Документация по разработке в 1С',
    description:
      'Полное руководство по стандартам разработки, лучшим практикам и инструментам для разработки в 1С:Предприятие 8',
    keywords: [
      '1С',
      'разработка',
      'стандарты',
      'кодирование',
      'лучшие практики',
      'DevOps',
      'документация',
    ],
    inLanguage: 'ru-RU',
    isAccessibleForFree: true,
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Yellow Hammer',
    },
  },
};

function structuredDataPlugin() {
  return {
    name: 'structured-data-plugin',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify(structuredData),
          },
        ],
      };
    },
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: site.title,
  tagline: site.tagline,
  favicon: assets.favicon,

  url: site.url,
  baseUrl: site.baseUrl,

  organizationName: site.organizationName,
  projectName: site.projectName,
  deploymentBranch: 'gh-pages',

  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/yellow-hammer/dev-rules/edit/main/',
          editLocalizedFiles: true,
          editCurrentVersion: true,
        },
        blog: false,
        sitemap: {
          changefreq: 'weekly',
          priority: 0.8,
          ignorePatterns: ['/search/**'],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: assets.ogImage,
    metadata,
    colorMode,
    mermaid,
    navbar: {
      title: site.title,
      items: navbarItems,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bsl'],
    },
    footer: {
      style: 'dark',
      links: footerLinks,
      copyright: `Copyright © ${new Date().getFullYear()} Yellow Hammer`,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
  },

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['ru'],
        docsRouteBasePath: '/',
      },
    ],
    structuredDataPlugin,
  ],

  headTags,
};

module.exports = config;
