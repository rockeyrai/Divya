import React, { forwardRef } from 'react';

const RaiNews = forwardRef((props, ref) => {
  return (
    <section ref={ref} style={{ height: '100vh' }}>
      <h1>News Section</h1>
    </section>
  );
});

export default RaiNews;
