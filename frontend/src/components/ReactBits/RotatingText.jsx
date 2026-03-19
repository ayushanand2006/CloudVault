import React, { useEffect, useRef } from 'react';

const RotatingText = ({ texts, className, typingSpeed = 50, deletingSpeed = 30, pauseDuration = 2000 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    let i = 0; 
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentText = texts[i];
      
      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      if (textRef.current) {
        textRef.current.textContent = currentText.substring(0, charIndex);
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, pauseDuration);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        i = (i + 1) % texts.length;
        timeoutId = setTimeout(type, Math.max(200, typingSpeed));
      } else {
        timeoutId = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    timeoutId = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, [texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span ref={textRef}></span>
      <span className="blinking-cursor" style={{ 
        display: 'inline-block', 
        width: '4px', 
        height: '1.1em', 
        backgroundColor: 'currentColor', 
        marginLeft: '4px',
        borderRadius: '2px'
      }}></span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </span>
  );
};

export default RotatingText;
