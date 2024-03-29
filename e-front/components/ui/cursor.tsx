"use client";

import React, { useContext } from "react";
import useMousePosition from "@/hooks/use-mouse-position";
import { CursorContext } from "@/context/cursor-context";
type PositionProps = {
    positions: {
        clientX: number;
        clientY: number;
        inView: boolean;
    };
};
const Cursor:React.FC<PositionProps> = ({ positions }) => {
    const {clientX, clientY, inView} = positions;
//   const { clientX, clientY } = useMousePosition();
//   const context = useContext(CursorContext);
//   if (!context) {
//     throw new Error('MyComponent must be used within a CursorContextProvider');
//   }
  return (
    <div 
      style={{ 
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none"
      }}
    >
      <svg
        width={50}
        height={50}
        viewBox="0 0 50 50"
        style={{
          position: "absolute",
          left: clientX,
          top: clientY,
          transform: `translate(-50%, -50%) scale(${inView ? 2.5 : 1})`,
          stroke: inView ? "black" : "white",
          strokeWidth: 1,
          fill: inView ? "rgba(255,255,255,.5)" : "black",
          transition: "transform .2s ease-in-out",
        //   transform: `translate(-50%, -50%) scale(${cursor.active ? 2.5 : 1})`,
        //   stroke: cursor.active ? "black" : "white",
        //   strokeWidth: 1,
        //   fill: cursor.active ? "rgba(255,255,255,.5)" : "black",
        //   transition: "transform .2s ease-in-out",
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="8"
        />
      </svg>
    </div>
  );
};
export default Cursor;