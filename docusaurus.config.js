const config = {
  title: 'Dev Rules',
  tagline: 'Документация проекта',
  url: 'https://yellow-hammer.github.io',
  baseUrl: '/dev-rules/',
  organizationName: 'yellow-hammer',
  projectName: 'dev-rules',
  trailingSlash: false,
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
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
      title: 'Dev Rules',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Документация',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Dev Rules`,
    },
  },

  favicon: 'src/img/icon.png',
};

module.exports = config; 