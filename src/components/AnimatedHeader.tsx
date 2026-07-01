"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function AnimatedHeader({ title, description, children }: AnimatedHeaderProps) {
  return (
    <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight mb-2 leading-tight"
        >
          <motion.span 
            animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="inline-block bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_20%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_100%)] bg-[length:200%_auto] text-transparent bg-clip-text"
          >
            {title}
          </motion.span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-sm md:text-sm text-white/50 mb-5 leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
      
      {children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </header>
  );
}
