"use client"
import React, { use, useEffect, useRef } from 'react'
import { Category, Product } from "@/types";
import Image from "next/image";
import gsap from 'gsap';
import { Flipper, Flipped, spring } from 'react-flip-toolkit';
import { useInView } from 'react-intersection-observer';

interface CategoryProps {
  items: Product[];
  // data: Category[];
}

const CategoryCard: React.FC<CategoryProps> = ({
  items
}) => {
  // gsap.registerPlugin(Flip);
  // const containerRef = useRef(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);




  const offset = 30;
  // Define initial and final positions for the card stack
  const cardStack = [
    { id: 'card1', translateX: 0, translateY: 0, zIndex: 3 }, // Top card
    { id: 'card2', translateX: 0, translateY: -50, zIndex: 2 },
    { id: 'card3', translateX: 0, translateY: -100, zIndex: 1 }, // Bottom card
  ];



  const shouldFlip = (previousData: any, currentData: any) => {
    // Example logic: flip if the IDs are different (you'll need to replace this with your actual logic)
    return previousData.id !== currentData.id;
  };
  // useEffect(() => {
  //     const container = containerRef.current;
  //     if (!container) return;

  //     let animations = [
  //       { translateX: 1025, translateY: -713.896, rotateZ: 0, scale: 1 },
  //       { translateX: 764.667, translateY: -649.669, rotateZ: 8.33333, scale: 0.833333 },
  //       { translateX: 511.345, translateY: -585.442, rotateZ: 16.6667, scale: 0.666667 },
  //     ];

  //     // Function to update positions
  //     const updatePositions = () => {
  //       animations.push(animations.shift()); // Move the first animation to the end
  //       applyAnimations();
  //     };

  //     // Recursive function to apply the animation and loop
  //     const applyAnimations = () => {
  //       animations.forEach((anim, i) => {
  //         const el = containerRef.current[i];
  //         if (el) {
  //           spring({
  //             config: "gentle",
  //             values: {
  //               translateX: [el.style.translateX || 0, anim.translateX],
  //               translateY: [el.style.translateY || 0, anim.translateY],
  //               rotateZ: [el.style.rotateZ || 0, anim.rotateZ],
  //               scale: [el.style.scale || 1, anim.scale]
  //             },
  //             onUpdate: ({ translateX, translateY, rotateZ, scale }) => {
  //               el.style.opacity = '1';
  //               el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`;
  //             },
  //             onComplete: () => {
  //               if (i === animations.length - 1) {
  //                 // When the last animation completes, update positions
  //                 updatePositions();
  //               }
  //             },
  //             delay: i * 150,
  //           });
  //         }
  //       });
  //     };

  //     // Start the animation loop
  //     applyAnimations();
  //   }, [items]); 

  useEffect(() => {
    const container = containerRef.current;
    let animations = [
      { translateX: 1025, translateY: -713.896, rotateZ: 0, scale: 1 },
      { translateX: 764.667, translateY: -649.669, rotateZ: 8.33333, scale: 0.833333 },
      { translateX: 511.345, translateY: -585.442, rotateZ: 16.6667, scale: 0.666667 },
    ];
  
    const animateCards = () => {
      animations.forEach((anim, i) => {
        const el = containerRef.current[i];
        if (el) {
          spring({
            config: "gentle",
            values: {
              translateX: [0, anim.translateX],
              translateY: [0, anim.translateY],
              rotateZ: [0, anim.rotateZ],
              scale: [1, anim.scale]
            },
            onUpdate: ({ translateX, translateY, rotateZ, scale }) => {
              el.style.opacity = '1';
              el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`;
            },
            onComplete: () => {
              // if (i === animations.length - 1) {
              //   // Shift the animations array for the next cycle
              //   const lastAnim = animations.pop();
              //   animations = [lastAnim, ...animations];
              //   animateCards(); // Start the next animation cycle
              // }
            },
            delay: i * 250,
          });
        }
      });
    };
  
    if (containerRef.current) {
      animateCards();
    }
  }, [items]);
  
  // Start the spring animation
  // spring({
  //   config: 'gentle',
  //     values: {
  //         opacity: [0, 1], // Starting from invisible to visible
  //     },
  //   onUpdate: (value:any) => {
  //     // Apply the value directly for opacity
  //     console.log(value)
  //     el.style.opacity = value.toString();
  //     // Translate the element based on the value
  //     const translateY = (1 - value) * -30; // Starting 30px up
  //     el.style.transform = `translateY(${translateY}px)`;
  //   },
  //   delay: i * 150, // Delay each card's animation for a staggered effect
  // });
  //   };
  return (
    //     <Flipper flipKey="unique-key">
    //     <ul className="container" ref={containerRef}>
    //       {Array.from({ length: 40 }, (_, i) => (
    //         <Flipped key={i} flipId={`square-${i}`} onAppear={() => onAppear}>
    //           <li className="square" />
    //         </Flipped>
    //       ))}
    //     </ul>
    //   </Flipper>
    <Flipper flipKey={items.map(item => item.id).join("")}>
      <div className="section__container">
        <div className="section__layoutContainer">
          <div className="section__layout">
            <div className='grid grid-cols-3 gap-2 relative EnterpriseHubHeroCardFan__content'  >
              {items.slice(0, 3).map((data, index) => (

                <Flipped flipId={data.id} key={data.id} stagger="card"  >
                  <div ref={(el) => (containerRef.current[index] = el)}
                    style={{
                      position: 'relative',
                      // Adjust the top property based on index to stack cards
                      top: `${index * -30}px`,
                      //   left: '50%',
                      transform: 'translate(-50%, 0)',
                      width: '300px',
                      zIndex: 3 - index, // Ensure correct stacking order
                    }}
                    className="EnterpriseHubHeroCard square bg-white rounded-xl shadow-xl overflow-hidden mb-10">
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
        </div>
      </div>
    </Flipper>
  )
}

export default CategoryCard
