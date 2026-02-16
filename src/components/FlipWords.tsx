"use client";

import { useState, useEffect } from "react";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function FlipWords({
  words,
  duration = 3000,
  className = "",
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={`relative inline-block ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`absolute left-0 top-0 inline-block transition-all duration-500 ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          {word}
        </span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  );
}
