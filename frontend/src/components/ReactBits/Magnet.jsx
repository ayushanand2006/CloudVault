import { useState, useEffect, useRef } from "react";

const Magnet = ({
  children,
  distance = 1,
  disabled = false,
  sticky = false,
  className = "",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef(null);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const dist = Math.sqrt(
        Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
      );

      if (dist < 100 * distance) {
        const x = (clientX - centerX) * 0.3 * distance;
        const y = (clientY - centerY) * 0.3 * distance;
        setPosition({ x, y });
      } else if (!sticky) {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [distance, disabled, sticky]);

  return (
    <div
      ref={magnetRef}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: sticky && position.x !== 0 ? "none" : "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
