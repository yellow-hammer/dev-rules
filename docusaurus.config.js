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
  
  // Markdown configuration
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
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    // Open Graph image for social media previews
    image: 'img/og-image.png',
    
    // Comprehensive meta tags for SEO and social media
    metadata: [
      // Basic SEO
      {name: 'description', content: 'Набор практик и стандартов для качественной разработки в 1С. Стандарты кодирования, лучшие практики, инструменты разработки и DevOps процессы.'},
      {name: 'keywords', content: '1С, разработка, стандарты, кодирование, лучшие практики, DevOps, документация, программирование'},
      {name: 'author', content: 'Yellow Hammer'},
      {name: 'robots', content: 'index, follow'},
      {name: 'language', content: 'ru'},
      {name: 'revisit-after', content: '7 days'},
      
      // Open Graph (Facebook, LinkedIn, etc.)
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'Соглашение о разработке'},
      {property: 'og:locale', content: 'ru_RU'},
      {property: 'og:image', content: 'https://yellow-hammer.github.io/dev-rules/img/og-image.png'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {property: 'og:image:type', content: 'image/jpeg'},
      {property: 'og:image:alt', content: 'Соглашение о разработке - Набор практик и стандартов для качественной разработки в 1С'},
      {property: 'og:image:secure_url', content: 'https://yellow-hammer.github.io/dev-rules/img/og-image.png'},
      
      // Twitter Cards
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@YellowHummer'},
      {name: 'twitter:creator', content: '@YellowHummer'},
      {name: 'twitter:image', content: 'https://yellow-hammer.github.io/dev-rules/img/og-image.png'},
      {name: 'twitter:image:alt', content: 'Соглашение о разработке - Набор практик и стандартов для качественной разработки в 1С'},
      
      // Additional social media
      {property: 'article:publisher', content: 'https://github.com/yellow-hammer'},
      {property: 'article:author', content: 'Yellow Hammer'},
      {property: 'article:section', content: 'Technology'},
      {property: 'article:tag', content: '1С, разработка, стандарты'},
      
      // Mobile and responsive
      {name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      {name: 'theme-color', content: '#ffd700'},
      {name: 'msapplication-TileColor', content: '#ffd700'},
      {name: 'msapplication-config', content: '/dev-rules/browserconfig.xml'},
      
      // Security
      {name: 'referrer', content: 'strict-origin-when-cross-origin'},
      {name: 'format-detection', content: 'telephone=no'},
      
      // Additional meta for better compatibility
      {name: 'msapplication-TileImage', content: 'https://yellow-hammer.github.io/dev-rules/img/og-image.png'},
      {name: 'msapplication-square150x150logo', content: 'https://yellow-hammer.github.io/dev-rules/img/og-image.png'},
      {property: 'og:updated_time', content: new Date().toISOString()},
      
      // PWA
      {name: 'application-name', content: 'Соглашение о разработке'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'default'},
      {name: 'apple-mobile-web-app-title', content: 'Dev Rules'},
      {name: 'mobile-web-app-capable', content: 'yes'},
    ],
    
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
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
    // Plugin for structured data
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
                innerHTML: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Соглашение о разработке",
                  "alternateName": "Dev Rules",
                  "url": "https://yellow-hammer.github.io/dev-rules/",
                  "description": "Набор практик и стандартов для качественной разработки в 1С",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Yellow Hammer",
                    "url": "https://github.com/yellow-hammer",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://yellow-hammer.github.io/dev-rules/img/og-image.png"
                    },
                    "sameAs": [
                      "https://github.com/yellow-hammer",
                      "https://t.me/YellowHummer"
                    ]
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://yellow-hammer.github.io/dev-rules/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  },
                  "mainEntity": {
                    "@type": "DocumentationSite",
                    "name": "Документация по разработке в 1С",
                    "description": "Полное руководство по стандартам разработки, лучшим практикам и инструментам для разработки в 1С:Предприятие 8",
                    "keywords": ["1С", "разработка", "стандарты", "кодирование", "лучшие практики", "DevOps", "документация"],
                    "inLanguage": "ru-RU",
                    "isAccessibleForFree": true,
                    "license": "https://creativecommons.org/licenses/by-sa/4.0/",
                    "copyrightYear": new Date().getFullYear(),
                    "copyrightHolder": {
                      "@type": "Organization",
                      "name": "Yellow Hammer"
                    }
                  }
                })
              }
            ]
          };
        }
      };
    }
  ],

  stylesheets: [
    'src/css/custom.css',
  ],

  // Additional HTML head tags
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/dev-rules/manifest.json'
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/dev-rules/img/icon.ico'
      }
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default'
      }
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-title',
        content: 'Dev Rules'
      }
    }
  ],

};

module.exports = config;
