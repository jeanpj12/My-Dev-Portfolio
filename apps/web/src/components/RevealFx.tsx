"use client";

import React, { useState, useEffect, forwardRef } from "react";

interface RevealFxProps {
  children: React.ReactNode;
  speed?: "slow" | "medium" | "fast";
  delay?: number;
  revealedByDefault?: boolean;
  translateY?: number | string; // Aceita número ou string como valor para `translateY`
  trigger?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const RevealFx = forwardRef<HTMLDivElement, RevealFxProps>(
  (
    {
      children,
      speed = "medium",
      delay = 0,
      revealedByDefault = false,
      translateY,
      trigger,
      style,
      className,
      ...rest
    },
    ref
  ) => {
    const [isRevealed, setIsRevealed] = useState(revealedByDefault);
    const [isBlurred, setIsBlurred] = useState(true); // Estado para controle do efeito de blur

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        setIsBlurred(false); // Remove o blur após o tempo de transição
      }, delay * 1000);

      return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
      if (trigger !== undefined) {
        setIsRevealed(trigger);
        if (trigger) setIsBlurred(false); // Remove o blur quando trigger for ativado
      }
    }, [trigger]);

    const getSpeedDuration = () => {
      switch (speed) {
        case "fast":
          return "duration-1000"; // 1s
        case "medium":
          return "duration-2000"; // 2s
        case "slow":
          return "duration-3000"; // 3s
        default:
          return "duration-2000"; // 2s
      }
    };

    const translateValue = translateY
      ? `translateY(${
          typeof translateY === "string" ? translateY : `${translateY}rem`
        })`
      : "translateY(0)";

    const revealStyle = {
      transitionDuration: getSpeedDuration(),
      transform: isRevealed ? "translateY(0)" : translateValue,
      opacity: isRevealed ? 1 : 0,
      ...style,
    };

    return (
      <div
        ref={ref}
        style={revealStyle}
        className={`relative ${isRevealed ? "opacity-100" : "opacity-0"} ${
          isBlurred ? "filter blur-sm" : ""
        } ${getSpeedDuration()} ${className || ""} transition-all ease-in-out`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

RevealFx.displayName = "RevealFx";
export { RevealFx };
