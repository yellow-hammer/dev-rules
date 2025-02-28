import React from 'react';
import DocItem from '@theme-original/DocItem';
import FeedbackButton from '@site/src/components/FeedbackButton';

export default function DocItemWrapper(props) {
  return (
    <>
      <DocItem {...props} />
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <FeedbackButton />
      </div>
    </>
  );
}
