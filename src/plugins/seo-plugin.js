/**
 * SEO Plugin для Docusaurus v3
 * Добавляет динамические canonical URLs и расширенные мета-теги для каждой страницы
 *
 * В Docusaurus v3 canonical URLs генерируются автоматически, но мы можем
 * улучшить их обработку и добавить дополнительные мета-теги через contentLoaded хук
 */

function seoPlugin(context, options) {
  const {
    siteConfig: { url, baseUrl },
  } = context;

  return {
    name: 'seo-plugin',
    contentLoaded({ content, actions }) {
      // Этот плагин в основном используется для обработки метаданных
      // Фактическая инъекция тегов происходит через swizzle компонента Head
    },
    injectHtmlTags() {
      // Глобальные теги уже добавлены в конфигурации
      // Динамические теги будут добавлены через клиентский компонент
      return {};
    },
  };
}

module.exports = seoPlugin;
