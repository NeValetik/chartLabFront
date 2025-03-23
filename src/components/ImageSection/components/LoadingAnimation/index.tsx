'use client'

import { useEffect, useState } from "react";

const getRandomColor = () => {
  const colors = [
    "text-monokai-green", "text-monokai-yellow", 
    "text-monokai-violet", "text-monokai-blue", 
    "text-monokai-orange", "text-monokai-red"
  ];
  const color = colors[Math.floor(Math.random()*colors.length)] ;
  return color;
}

interface LineCell {
  char: string;
  color: string;
}

const LoadingAnimation = () => {
  const [lines, setLines] = useState<LineCell[][]>([]);
  const gridSize = 30;
  const maxLines = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => [
        ...prev.slice(-maxLines + 1),
        Array.from({ length: gridSize }, () => ({
          char: Math.random() < 0.5 ? "╱" : "╲",
          color: getRandomColor(),
        }))
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className={`font-mono whitespace-pre-wrap transition-all ${getRandomColor()}`}>
      <div className="grid leading-none" style={{ gridTemplateColumns: `repeat(${gridSize}, 1ch)` }}>
        {lines.flat().map((cell, index) => (
          <span key={index} className={`${cell.color} text-lg leading-[21.6px] transition-transform`}>{cell.char}</span>
        ))}
      </div>
    </pre>
  );
}

export default LoadingAnimation;