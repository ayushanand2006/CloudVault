import { useEffect, useRef, useState } from "react";

const CountUp = ({
  from = 0,
  to,
  duration = 2,
  className = "",
  startOnView = true,
  decimals = 0,
}) => {
  const [count, setCount] = useState(from);
  const countRef = useRef(from);
  const startTime = useRef(null);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(containerRef.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / (duration * 1000), 1);
      
      const nextCount = from + (to - from) * progress;
      setCount(nextCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, to, from, duration]);

  return (
    <span ref={containerRef} className={className}>
      {count.toFixed(decimals)}
    </span>
  );
};

export default CountUp;
