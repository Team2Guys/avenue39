'use client';
import React, { useEffect, useState } from 'react';

interface LazyBackgroundProps {
  style?: React.CSSProperties;
  item: any
}

const LazyBackground: React.FC<LazyBackgroundProps> = ({ style , item }) => {
  const [isInView, setIsInView] = useState(false);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const target = document.getElementById('lazy-background');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <div className={`${item.bgClass} bg-cover bg-no-repeat bg-center h-full w-full rounded-3xl`} style={{
           ...style,
           backgroundImage: isInView ? `url(${item.bgClass})` : undefined,
           transition: 'background-image 0.3s ease-in-out',
         }}>
      <p className="group-hover:opacity-0 absolute bottom-1 left-1/2 transform -translate-x-1/2 text-center text-white font-semibold text-20 xl:text-[26px] w-full">
        {item.text}
      </p>
    </div>
  );
};

export default LazyBackground;
