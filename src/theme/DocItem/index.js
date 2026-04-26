import React from 'react';
import DocItem from '@theme-original/DocItem';
import FeedbackButton from '@site/src/components/FeedbackButton';
import styles from './styles.module.css';

export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <div className={styles.feedback}>
        <FeedbackButton />
      </div>
    </>
  );
}
