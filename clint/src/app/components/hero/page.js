import React, { forwardRef } from 'react';

const RaiHero = forwardRef((props, ref) => {
  return (
    <section ref={ref} style={{ height: '100vh' }}>
      <h1>Hero Section</h1>
    </section>
  );
});

export default RaiHero;
