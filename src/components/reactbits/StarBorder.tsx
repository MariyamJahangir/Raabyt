"use client";

import React from "react";

type StarBorderOwnProps = {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
  innerClassName?: string;
};

type StarBorderProps = StarBorderOwnProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof StarBorderOwnProps> & {
    // allow any extra props passed to the underlying element (href, type, etc.)
    [key: string]: unknown;
  };

const StarBorder = ({
  as,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  innerClassName = "",
  children,
  style,
  ...rest
}: StarBorderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = as || "button";

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      {...rest}
      style={{
        padding: `${thickness}px 0`,
        ...(style as React.CSSProperties | undefined),
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className={`relative z-[1] bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center rounded-full ${innerClassName}`}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
