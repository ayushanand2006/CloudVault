import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ text, className, delay = 0.05 }) => {
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline-block' },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.3em' }}>
          {Array.from(word).map((char, charIndex) => (
             <motion.span key={charIndex} variants={child}>
               {char}
             </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

export default TypingText;
