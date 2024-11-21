import React, { forwardRef } from 'react';

const RaiService = forwardRef((props, ref) => {
  return (
    <section ref={ref} style={{ height: '100vh' }}>
      <h1>service ecton</h1>
    </section>
  );
});

export default RaiService;
