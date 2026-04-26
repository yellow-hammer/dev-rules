import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './FeedbackButton.module.css';

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('');
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedFeedback = feedback.trim();
    if (!trimmedFeedback) {
      setStatus('Опишите замечание перед отправкой.');
      return;
    }

    const pageUrl = globalThis.location.href;
    const pagePath = location.pathname;
    const pageTitle = document.title;

    const issueBody = `
## Замечание к странице

**Страница:** [${pageTitle}](${pageUrl})
**Путь:** \`${pagePath}\`

### Содержание замечания

${trimmedFeedback}

---
*Отправлено через форму обратной связи на сайте.*
`;

    const issueUrl = new URL('https://github.com/yellow-hammer/dev-rules/issues/new');
    issueUrl.searchParams.set('title', `Замечание к странице: ${pageTitle}`);
    issueUrl.searchParams.set('body', issueBody);

    const issueWindow = globalThis.open(issueUrl.toString(), '_blank', 'noopener,noreferrer');

    if (issueWindow) {
      setFeedback('');
      setIsOpen(false);
      setStatus('');
      return;
    }

    setStatus(
      'Браузер заблокировал открытие GitHub. Разрешите всплывающие окна и повторите отправку.'
    );
  };

  return (
    <div className={styles.feedbackContainer}>
      <button
        className={styles.feedbackButton}
        type="button"
        aria-controls="page-feedback-form"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          setStatus('');
        }}
      >
        Отправить замечание
      </button>

      {isOpen && (
        <div className={styles.feedbackForm} id="page-feedback-form">
          <form onSubmit={handleSubmit}>
            <label className={styles.feedbackLabel} htmlFor="page-feedback-text">
              Замечание к странице
            </label>
            <textarea
              id="page-feedback-text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Опишите ваше замечание..."
              rows={4}
              required
            />
            {status && <p className={styles.feedbackStatus}>{status}</p>}
            <div className={styles.feedbackActions}>
              <button className="button button--primary button--sm" type="submit">
                Открыть GitHub issue
              </button>
              <button
                className="button button--secondary button--sm"
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setStatus('');
                }}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
