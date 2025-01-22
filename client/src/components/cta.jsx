import React from 'react';
import { motion } from 'framer-motion';
import '../styles/cta.css';

const CTA = React.forwardRef((props , ref) => {
  return (
    <motion.div
      className="cta-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Ready to transform your business? Let's work together.
      </motion.h3>
      <motion.button
        className="cta-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Get Started Today
      </motion.button>
    </motion.div>
  );
});

export default CTA;

