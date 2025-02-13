import React from "react";
import { motion } from "framer-motion";
import "../styles/cta.css";
import Click from "../common/routes/click";


const CTA = React.forwardRef((props , ref) => {


  const add = async (type, on) => {
    try {
      await Click("/add", {
        type: type,
        on: on,
        nb: 1,
      });

      console.log("Click added successfully.");
    } catch (error) {
      console.error("Error adding visit:", error.message);
    }
  };


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
    <a href="tel:+1234567890">
        <motion.button
          onClick={() => {
            add("Click", "Get Started Click");
          }}
          className="cta-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Get Started Today
        </motion.button>
    </a>
    </motion.div>
  );
});

export default CTA;
