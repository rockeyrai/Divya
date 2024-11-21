import React, { forwardRef } from 'react';

const RaiHero = forwardRef((props, ref) => {
  return (
    <section ref={ref} style={{ height:  'calc(100vh - 80px)' }}>
      <h1>Hero Section</h1>
    </section>
  );
});

export default RaiHero;
