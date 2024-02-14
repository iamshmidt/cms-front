'use client';

import { useEffect } from "react";
import { PuffLoader } from "react-spinners";

const LoaderFull = () => {
  useEffect(() => {
    // Add class to body to disable scrollbar
    document.body.classList.add('disable-scroll');

    return () => {
      // Remove class from body when component is unmounted
      document.body.classList.remove('disable-scroll');
    };
  }, []);
  return (
    <div
    className="
      h-[100vh]
      fixed
      w-full
      z-10
      bg-zinc-50
      overflow-hidden
        top-0
        left-0
        right-0
        bottom-0
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <PuffLoader
        size={80}
        color="blue"
      />
    </div>
  )
}

export default LoaderFull
