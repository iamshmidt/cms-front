"use client"
import React, { use, useEffect, useRef } from 'react'
import { Category, Product } from "@/types";
import Image from "next/image";
import gsap from 'gsap';
import { Flipper, Flipped } from 'react-flip-toolkit';

interface CategoryProps {
    items: Product[];
    // data: Category[];
}

const CategoryCard: React.FC<CategoryProps> = ({
    items
}) => { 
    // gsap.registerPlugin(Flip);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const offset = 30;
// Predefined animation properties for each card position
// const animationSteps = [
//     { zIndex:1, x: -85.9766, y: -713.906, rotationZ: 0, scale: 1 },
//     {  zIndex: 0,x: 143.357, y: -585.446, rotationZ: 16.6667, scale: 0.666667 },
//     {  zIndex: 2,x: 764.667, y: -649.676, rotationZ: 8.33333, scale: 0.833333 },
//     // Add more steps if you have more cards
//   ];
//   translateX(879.333px) translateY(-585.442px) rotateZ(16.6667deg) scale(0.666667)translateX(879.333px) translateY(-585.442px) rotateZ(16.6667deg) scale(0.666667)
//translateX(764.667px) translateY(-649.669px) rotateZ(8.33333deg) scale(0.833333)
//764.667
//translateX(650px) translateY(-713.896px) rotateZ(0deg) scale(1)
//   function diagonalLoop() {
//     let totalItems = cardsRef.current.filter(Boolean).length; // Filter out null values
//     let currentItem = 0;

//     function updatePositions() {
//       for (let i = 0; i < totalItems; i++) {
//         let itemIndex = (currentItem + i) % totalItems;
//         let item = cardsRef.current[itemIndex];
//         if (item) {
//           const { x, y, rotationZ, scale } = animationSteps[i % animationSteps.length];
//           gsap.to(item, {
//             x: x,
//             y: y,
//             rotationZ: rotationZ,
//             scale: scale,
//             zIndex: totalItems - i,
//             opacity: 1,
//             duration: 1, // Adjust as needed
//           });
//         }
//       }
//     }

//     function moveToNext() {
//       currentItem = (currentItem + 1) % totalItems;
//       updatePositions();
//     }

//     const intervalId = setInterval(moveToNext, 2000); // Every 2 seconds
//     updatePositions();

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }

//   useEffect(() => {
//     if (items.length) diagonalLoop();
//   }, [items]);
    // useEffect(() => {
    //     // Ensure the cards are present
    //     if (cardsRef.current) {
    //       const cards = cardsRef.current;
    //       const tl = gsap.timeline({ repeat: -1, yoyo: false });
    
    //       // Define the animation properties
    //       const duration = 0.75;
    //       const staggerVal = 0.15;
    
    //       // Apply the animation to each card
    //       cards.forEach((card, index) => {
    //         tl.to(card, {
    //           x: '-=50', // Move left
    //           y: '-=100', // Move up
    //           rotation: 10, // Rotate
    //           scale: 1.1, // Scale up
    //           duration: duration,
    //           ease: "power2.inOut",
    //         }, staggerVal * index); // Stagger the start
    //       });
    //     }
    //   }, []);
    // useEffect(() => {
    //     // Define the animation properties for each card based on its index
    //     const animations = [
    //         { z: 0, x: 143.357, y: -585.446, rotationZ: 16.6667, scale: 0.666667 },
    //         { z: 1, x: 28.6901, y: -649.676, rotationZ: 8.33333, scale: 0.833333 },
    //         { z: 2, x: -85.9766, y: -713.906, rotationZ: 0, scale: 1 },
    //       // Add more transformations if you have more than three cards
    //     ];
    
    //     const tl = gsap.timeline({ repeat: -1 });

    //     cardsRef.current.forEach((card, index) => {
    //       if (card) {
    //         // Determine the next position in the sequence
    //         const nextIndex = (index + 1) % animations.length;
    //         const { z, x, y, rotationZ, scale } = animations[nextIndex];
    
    //         // Add the animation to the timeline
    //         tl.to(card, {
    //           zIndex: z,
    //           x: x,
    //           y: y,
    //           rotation: rotationZ,
    //           scale: scale,
    //           duration: 1, // Set duration as needed
    //           // ease: "none", // Set easing as needed
    //         }, index * 0.5); // Stagger the start of each animation
    //       }
    //     });
    //     // return () => tl.kill();
    // }, [items]); 
    // z-index: 0; translateX(143.357px) translateY(-585.446px) rotateZ(16.6667deg) scale(0.666667)
    // z-index: 1;translateX(28.6901px) translateY(-649.676px) rotateZ(8.33333deg) scale(0.833333)
    //z-index: 2;translateX(-85.9766px) translateY(-713.906px) rotateZ(0deg) scale(1)


  const shouldFlip=(index: number) => (prev: number, current: number) =>{
    console.log('prev', prev, 'current', current, 'index', index)
    return index === prev || index === current;
  }
  return (
    <Flipper flipKey={items.map(item => item.id).join("")}>
    <div className="fixed w-full">
        <div className='w-full relative flex justify-center'></div>
    <div className='grid grid-cols-3 gap-2'>
       {items.slice(0, 3).map((data, index) => (
        <Flipped flipId={data.id} key={data.id}  stagger="card" shouldFlip={shouldFlip(index)}   onStart={el => {
           
              el.classList.add("animated-in");
 console.log('start')
          }}>
                        <div key={data.id}  ref={(el) => (cardsRef.current[index] = el)} className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
                             <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                {/* <Image src={data?.images?.[0]?.url} fill alt='image' className="max-h-full"></Image> */}
                <Image src={data?.images?.[0]?.url} layout="fill" objectFit="cover" alt='image' className="absolute top-0 left-0 w-full h-full"></Image>


                <div className="absolute w-full px-6 top-5">
                 
                </div>
                <div className="lg:opacity-0 sm:opacity-1 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                      
                
                    </div>
                </div>
            </div>
            {/* Description */}
            <div className="">
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data?.category?.name}
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
             
            </div>
        </div>
                        </div>
                        </Flipped>
                ))}
    </div>
    </div>
    </Flipper>
  )
}

export default CategoryCard
