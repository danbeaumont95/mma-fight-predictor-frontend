import React, { useEffect, useState } from 'react';

function AnimatedValue({ endValue }: {endValue: number}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTimestamp = performance.now();
    // const endValue = 100;
    const duration = 5000;

    const animateValue = (timestamp: any) => {
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(progress * (endValue - 0) + 0));

      if (progress < 1) {
        window.requestAnimationFrame(animateValue);
      }
    };

    window.requestAnimationFrame(animateValue);
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui', fontWeight: 800, fontSize: '40px' }}>
      {value}
    </div>
  );
}

export default AnimatedValue;
