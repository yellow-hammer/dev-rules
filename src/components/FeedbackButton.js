import React, { useState } from 'react';
import styles from './FeedbackButton.module.css';
import { useLocation } from '@docusaurus/router';

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Текущий URL страницы
      const pageUrl = window.location.href;
      const pagePath = location.pathname;

      // Получаем заголовок страницы
      const pageTitle = document.title;

      // Формируем тело для создания issue
      const issueBody = `
## Замечание к странице

**Страница:** [${pageTitle}](${pageUrl})
**Путь:** \`${pagePath}\`

### Содержание замечания:
${feedback}

---
*Отправлено через форму обратной связи на сайте.*
      `;

      // Открываем GitHub issue в новой вкладке с предзаполненными данными
      const repoUrl = 'https://github.com/yellow-hammer/dev-rules/issues/new';
      const issueUrl = new URL(repoUrl);
      issueUrl.searchParams.append('title', `Замечание к странице: ${pageTitle}`);
      issueUrl.searchParams.append('body', issueBody);

      window.open(issueUrl.toString(), '_blank');

      // Сбрасываем форму
      setFeedback('');
      setIsOpen(false);
      alert('Спасибо! Вы будете перенаправлены на GitHub для создания issue.');
    } catch (error) {
      console.error('Ошибка при отправке замечания:', error);
      alert('Произошла ошибка при отправке замечания. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <button className={styles.feedbackButton} onClick={() => setIsOpen(!isOpen)}>
        Отправить замечание
      </button>

      {isOpen && (
        <div className={styles.feedbackForm}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Опишите ваше замечание..."
              rows={4}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Отмена
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
