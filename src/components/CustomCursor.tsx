"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const getCardColor = (id: string | null) => {
  switch (id) {
    case "whatsnew": return "#eab308"; // Yellow
    case "updatebroadcast": return "#6366f1"; // Indigo
    case "engagement": return "#10b981"; // Emerald
    case "releaseeditor": return "#ec4899"; // Pink
    case "changelog": return "#ffffff"; // White
    case "codediff": return "#22c55e"; // Green
    default: return "#ccff00"; // Neon default
  }
};

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverColor, setHoverColor] = useState("#ccff00");
  const [cursorText, setCursorText] = useState("Click Me!");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values directly without triggering React state updates
      mouseX.set(e.clientX - 30);
      mouseY.set(e.clientY - 10);

      const target = e.target as HTMLElement;
      const cardWrapper = target?.closest('.float-card') as HTMLElement;
      
      if (cardWrapper) {
        const cardId = cardWrapper.getAttribute("data-card-id");
        const cText = cardWrapper.getAttribute("data-cursor-text");
        
        setHoverColor(prev => {
          const newColor = getCardColor(cardId);
          return prev !== newColor ? newColor : prev;
        });
        setCursorText(prev => prev !== (cText || "Click Me!") ? (cText || "Click Me!") : prev);
        setIsHovering(prev => prev !== true ? true : prev);
      } else {
        setIsHovering(prev => prev !== false ? false : prev);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.15, type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          {/* Pixel Art Design */}
          <div 
            className="px-2 py-1 text-black font-mono text-[10px] uppercase font-bold tracking-widest relative"
            style={{
              backgroundColor: hoverColor,
              // Classic 8-bit blocky border simulation using box-shadow
              boxShadow: `inset -2px -2px 0px 0px rgba(0,0,0,0.2), 2px 0 0 ${hoverColor}, -2px 0 0 ${hoverColor}, 0 -2px 0 ${hoverColor}, 0 2px 0 ${hoverColor}`,
              imageRendering: "pixelated"
            }}
          >
            {cursorText}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
