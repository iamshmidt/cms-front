"use client";
import { CursorContext } from "@/context/cursor-context";
import { useState, useEffect, RefObject, useContext } from "react";

interface Position {
    clientX: number;
    clientY: number;
}

const containerElement=(containerRef: RefObject<HTMLElement>)=>{
    // const [position, setPosition] = useState<Position>({ clientX: 0, clientY: 0 });
    // // const context = useContext(CursorContext);
    // if (!context) {
    //     throw new Error('MyComponent must be used within a CursorContextProvider');
    // }
    // const { position, setPosition } = context;
// console.log('position', context)
    // useEffect(() => {
    //     // Check if the ref is currently pointing to a node
    //     const containerElement = containerRef.current;
        
    //     if (!containerElement) {
    //       // If not, return a function that does nothing
    //       return () => {};
    //     }
    // console.log('containerElement', containerElement)
    //     // Define the event listener
        const updatePosition = (event: MouseEvent) => {
            const { left, top } = containerElement.getBoundingClientRect();
            console.log('left', event.clientX - left)
            // setPosition({ clientX: event.clientX - left, clientY: event.clientY - top });
          };
    
    //       containerElement.addEventListener('mousemove', updatePosition);
    
    //       return () => {
    //         containerElement.removeEventListener('mousemove', updatePosition);
          
    //     }
    // },[containerRef]);
    // return position;

}

export default containerElement;
const useMousePosition = () => {
    // const [position, setPosition] = useState({ clientX: 0, clientY: 0 });
//   useEffect(() => {
//     // Check if the ref is currently pointing to a node
//     const containerElement = containerRef.current;
    
//     if (!containerElement) {
//       // If not, return a function that does nothing
//       return () => {};
//     }

//     // Define the event listener
//     const updatePosition = (event: MouseEvent) => {
//         const { left, top } = containerElement.getBoundingClientRect();
//         console.log('left', event.clientX - left)
//         // setPosition({ clientX: event.clientX - left, clientY: event.clientY - top });
//       };

//       containerElement.addEventListener('mousemove', updatePosition);

//       return () => {
//         containerElement.removeEventListener('mousemove', updatePosition);
      
//     }
// },[containerRef]);



  return position;
};

// export default useMousePosition;