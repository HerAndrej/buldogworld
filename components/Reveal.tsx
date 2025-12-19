import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0, 
  direction = 'up',
  duration = 700,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransform = () => {
    if (direction === 'none') return 'none';
    if (direction === 'up') return 'translateY(30px)';
    if (direction === 'down') return 'translateY(-30px)';
    if (direction === 'left') return 'translateX(30px)';
    if (direction === 'right') return 'translateX(-30px)';
    return 'none';
  };

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ width, position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          transform: isVisible ? 'translate(0, 0)' : getTransform(),
          opacity: isVisible ? 1 : 0,
          transition: `all ${duration}ms cubic-bezier(0.5, 0, 0, 1) ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
};