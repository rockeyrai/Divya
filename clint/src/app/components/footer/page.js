import React, { forwardRef } from 'react';

const RaiFooter = forwardRef((props, ref) => {
  return (
    <section ref={ref} style={{ height: '100vh' }}>
      <h1>
        footer Section</h1>
    </section>
  );
});

export default RaiFooter;
