/**
 * Корневой компонент для добавления SEO мета-тегов
 * Использует React hooks для динамического обновления мета-тегов на каждой странице
 */

import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({ children }) {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const { url, baseUrl } = siteConfig;

  useEffect(() => {
    // Формируем полный URL текущей страницы
    const path = location.pathname.replace(/\/$/, '') || '/';
    const baseUrlClean = baseUrl.replace(/\/$/, '');
    const pathClean = path === '/' ? '' : path;
    const fullUrl = `${url}${baseUrlClean}${pathClean}`.replace(/\/+/g, '/');

    // Определяем, является ли это главной страницей
    const isHomePage = path === '/' || path === baseUrlClean || path === '';

    // Получаем метаданные страницы
    const pageTitle = document.title || siteConfig.title;
    const metaDescription =
      document.querySelector('meta[name="description"]')?.content || siteConfig.tagline;

    // Docusaurus автоматически генерирует canonical URL, но мы можем обновить его, если нужно
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      // Обновляем существующий canonical URL, если он не соответствует текущему пути
      if (!canonicalLink.href || canonicalLink.href !== fullUrl) {
        canonicalLink.href = fullUrl;
      }
    }

    // Обновляем Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = fullUrl;

    // Обновляем Open Graph Title (если еще не задан динамически)
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    if (!ogTitle.content || ogTitle.content === siteConfig.title) {
      ogTitle.content = pageTitle;
    }

    // Обновляем Open Graph Description (если еще не задан динамически)
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    if (!ogDescription.content || ogDescription.content === siteConfig.tagline) {
      ogDescription.content = metaDescription;
    }

    // Обновляем Open Graph Type (article для страниц документации, website для главной)
    const ogType = isHomePage ? 'website' : 'article';
    let ogTypeMeta = document.querySelector('meta[property="og:type"]');
    if (!ogTypeMeta) {
      ogTypeMeta = document.createElement('meta');
      ogTypeMeta.setAttribute('property', 'og:type');
      document.head.appendChild(ogTypeMeta);
    }
    ogTypeMeta.content = ogType;

    // Обновляем Twitter Card Title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    if (!twitterTitle.content || twitterTitle.content === siteConfig.title) {
      twitterTitle.content = pageTitle;
    }

    // Обновляем Twitter Card Description
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    if (!twitterDescription.content || twitterDescription.content === siteConfig.tagline) {
      twitterDescription.content = metaDescription;
    }

    // Добавляем article:published_time и article:modified_time для статей
    if (ogType === 'article') {
      const now = new Date().toISOString();

      let articlePublished = document.querySelector('meta[property="article:published_time"]');
      if (!articlePublished) {
        articlePublished = document.createElement('meta');
        articlePublished.setAttribute('property', 'article:published_time');
        document.head.appendChild(articlePublished);
      }
      if (!articlePublished.content) {
        articlePublished.content = now;
      }

      let articleModified = document.querySelector('meta[property="article:modified_time"]');
      if (!articleModified) {
        articleModified = document.createElement('meta');
        articleModified.setAttribute('property', 'article:modified_time');
        document.head.appendChild(articleModified);
      }
      articleModified.content = now;
    }
  }, [location.pathname, siteConfig, url, baseUrl]);

  return <>{children}</>;
}
