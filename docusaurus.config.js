// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const config = {
  title: 'Соглашение о разработке',
  tagline: 'Набор практик и стандартов для качественной разработки в 1С',
  favicon: 'src/img/icon.ico',
  
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
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Ссылки',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/yellow-hammer',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/YellowHummer',
            },
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Yellow Hammer`,
    },
  },

};

module.exports = config; 
