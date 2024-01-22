'use client';

import { PuffLoader } from "react-spinners";

const LoaderFull = () => {
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
