"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverColor, setHoverColor] = useState("#ccff00");
  const [cursorText, setCursorText] = useState("Click Me!");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const cardWrapper = target?.closest('.float-card') as HTMLElement;
      
      if (cardWrapper) {
        const cardId = cardWrapper.getAttribute("data-card-id");
        const cText = cardWrapper.getAttribute("data-cursor-text");
        setHoverColor(getCardColor(cardId));
        setCursorText(cText || "Click Me!");
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
            x: position.x - 30, // Offset so the cursor points at the top-left of the pixel box
            y: position.y - 10,
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
