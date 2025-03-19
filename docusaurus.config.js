// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const config = {
  title: 'Соглашение о разработке',
  tagline: 'Набор практик и стандартов для качественной разработки в 1С',
  favicon: 'img/icon.ico',
  
  // Set the production url of your site here
  url: 'https://yellow-hammer.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/dev-rules/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yellow-hammer',
  projectName: 'dev-rules',
  deploymentBranch: 'gh-pages',

  trailingSlash: false,
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
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
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Соглашение о разработке',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Начало',
        },
        {
          type: 'search',
          position: 'right', 
        },
        {
          href: 'https://github.com/yellow-hammer/dev-rules',
          label: 'GitHub',
          position: 'right',
        }
      ],
    },
    prism: {
      additionalLanguages: ['bsl'],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Сообщество',
          items: [
            {
              label: 'Обсудить',
              href: 'https://github.com/yellow-hammer/dev-rules/discussions',
            },
            {
              label: 'Отправить отзыв',
              href: 'https://github.com/yellow-hammer/dev-rules/issues',
            },
            {
              label: 'Предложить изменения',
              href: 'https://github.com/yellow-hammer/dev-rules/pulls',
            }
          ],
        },
        {
          title: 'Больше информации',
          items: [
            {
              label: 'Журнал изменений',
              href: 'https://github.com/yellow-hammer/dev-rules/blob/main/CHANGELOG.md',
            },
            {
              label: 'Релизы',
              href: 'https://github.com/yellow-hammer/dev-rules/releases',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/yellow-hammer',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/YellowHummer',
            },
          ],
        },
        {
          title: 'Юридическая информация',
          items: [
            {
              label: 'Лицензия',
              href: 'https://github.com/yellow-hammer/dev-rules/blob/main/LICENSE',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Yellow Hammer`,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    feedback: {
      content: 'Нашли ошибку? Создайте issue!',
      feedbackLink: 'https://github.com/yellow-hammer/dev-rules/issues/new',
    },
  },

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ["ru"],
        docsRouteBasePath: '/',
      }
    ],
  ],

  stylesheets: [
    'src/css/custom.css',
  ],

};

module.exports = config;
