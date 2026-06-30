"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function generateSnake(gridSize: number, startX: number, startY: number, steps: number, direction: "R-D" | "R-U" | "L-D" | "L-U") {
  let path = `M ${startX * gridSize} ${startY * gridSize}`;
  let cx = startX;
  let cy = startY;
  let isHoriz = true;

  for (let i = 0; i < steps; i++) {
    const dist = Math.floor(Math.random() * 4) + 3; // 3 to 6 grid units
    if (isHoriz) {
      cx += direction.includes("R") ? dist : -dist;
      path += ` L ${cx * gridSize} ${cy * gridSize}`;
    } else {
      cy += direction.includes("D") ? dist : -dist;
      path += ` L ${cx * gridSize} ${cy * gridSize}`;
    }
    isHoriz = !isHoriz;
  }
  return path;
}

export default function GridSnakes() {
  const [paths, setPaths] = useState<{path: string, duration: number, delay: number}[]>([]);
  const gridSize = 64; // 4rem = 64px

  useEffect(() => {
    let mounted = true;
    // Generate some random paths that traverse the screen
    // We assume a large virtual canvas (e.g., 3000x2000) so they cover any screen size
    const newPaths = [
      { path: generateSnake(gridSize, -2, 2, 12, "R-D"), duration: Math.random() * 5 + 10, delay: Math.random() * 5 },
      { path: generateSnake(gridSize, 10, -2, 10, "R-D"), duration: Math.random() * 5 + 10, delay: Math.random() * 5 },
      { path: generateSnake(gridSize, 30, -2, 14, "L-D"), duration: Math.random() * 5 + 10, delay: Math.random() * 5 },
      { path: generateSnake(gridSize, -2, 15, 12, "R-U"), duration: Math.random() * 5 + 10, delay: Math.random() * 5 },
      { path: generateSnake(gridSize, 40, 20, 15, "L-U"), duration: Math.random() * 5 + 10, delay: Math.random() * 5 },
      { path: generateSnake(gridSize, -2, 8, 10, "R-D"), duration: Math.random() * 5 + 10, delay: Math.random() * 5 },
    ];
    if (mounted) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaths(newPaths);
    }
    return () => { mounted = false; };
  }, [gridSize]);

  if (paths.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <svg className="w-full h-full opacity-60">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path.path}
            stroke="#22c55e" /* Neon Green / Emerald-500 */
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{
              pathLength: 0.15, // Panjang ular (15% dari total jalur)
              pathOffset: [1, -0.15], // Bergerak dari ujung ke ujung
            }}
            transition={{
              pathOffset: {
                duration: path.duration, // 10s to 15s speed
                repeat: Infinity,
                ease: "linear",
                delay: path.delay, // Random start delay
              },
              pathLength: {
                duration: 0.1, // Instantly set the length
              }
            }}
          />
        ))}
      </svg>
    </div>
  );
}
