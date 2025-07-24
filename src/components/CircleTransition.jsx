import React from "react";
import { motion } from "framer-motion";

const CircleTransition = ({ isVisible, onComplete, origin, duration = 0.8 }) => {
  return (
    isVisible && (
      <motion.div
        className="fixed z-[9999] bg-black rounded-full"
        initial={{ scale: 0, top: origin.y, left: origin.x }}
        animate={{ scale: 200 }}
        transition={{ duration, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
        style={{ width: 20, height: 20, transform: "translate(-50%, -50%)" }}
      />
    )
  );
};

export default CircleTransition;
