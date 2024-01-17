"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import { Category, Product } from "@/types";
import Image from "next/image";
import gsap from 'gsap';
import { Flipper, Flipped, spring } from 'react-flip-toolkit';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimate } from "framer-motion";
import { useGSAP } from "@gsap/react";
interface CategoryProps {
  items: Product[];
  // data: Category[];
}

interface Animation {
  translateX: number;
  translateY: number;
  rotateZ: number;
  scale: number;
}

const CategoryCard: React.FC<CategoryProps> = ({
  items
}) => {
  // gsap.registerPlugin(Flip);
  // const containerRef = useRef(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPositions, setCurrentPositions] = useState([]);


  const [scope, animate] = useAnimate()

  const offset = 30;
  // Define initial and final positions for the card stack
  const cardStack = [
    { id: 'card1', translateX: 0, translateY: 0, zIndex: 3 }, // Top card
    { id: 'card2', translateX: 0, translateY: -50, zIndex: 2 },
    { id: 'card3', translateX: 0, translateY: -100, zIndex: 1 }, // Bottom card
  ];



  // const shouldFlip = (previousData: any, currentData: any) => {
  //   // Example logic: flip if the IDs are different (you'll need to replace this with your actual logic)
  //   return previousData.id !== currentData.id;
  // };
  const shouldFlip = (prev: any, current: any) => {
    // Example logic: flip if the IDs are different (you'll need to replace this with your actual logic)
    if (prev.type !== current.type) {
      return true;
    }
    return false;
  };

  const shuffleCards = (i: number, translateX: number, translateY: number, translateZ: number, scale: number) => {
    console.log(i, 'SHUFFLE')
    console.log(translateX, 'SHUFFLE')
    console.log(translateY, 'SHUFFLE')
    console.log(translateZ, 'SHUFFLE')
    console.log(scale, 'SHUFFLE')
    const el = containerRef.current[i];
    console.log(el)

    animate("#target-" + i, { x: translateX, y: translateY, z: translateZ, scale: scale, opacity: 0 })
  }


  useGSAP(() => {
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
            config: 'gentle',
            values: {
              translateX: [currentPositions[i] || 0, anim.translateX],
              translateY: [currentPositions[i] || 0, anim.translateY],
              rotateZ: [currentPositions[i] || 0, anim.rotateZ],
              scale: [currentPositions[i] || 1, anim.scale],
            },
            onUpdate: ({ translateX, translateY, rotateZ, scale }) => {
              el.style.opacity = '1';
              el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`;
              el.style.top = '40%';
              el.style.right = '90%';
            },
            onComplete: () => {
              const nextIndex = (currentIndex + 1) % animations.length;
              setCurrentIndex(nextIndex);

              // Store the current positions of the cards
              const newPositions = animations.map((anim) => ({
                translateX: anim.translateX,
                translateY: anim.translateY,
                rotateZ: anim.rotateZ,
                scale: anim.scale,
              }));
              setCurrentPositions(newPositions);
              // console.log(newPositions)

              swapCards(newPositions)
              // gsap.fromTo( `#target-${nextIndex}`, {y:0}, {y:-100, duration: 1, ease: "power2.inOut"});
              // gsap.to( `#target-${nextIndex}`, {y:0}); // <-- automatically reverted
            },
            delay: i * 250,
          });
        }
      });
    };

    animateCards();
    // x: newPositions[i + 1].translateX,
    // y: newPositions[i + 1].translateY,
    // // z: newPositions[i + 1].rotateZ,
    // rotateZ: newPositions[i + 1].rotateZ,
    // scale: newPositions[i + 1].scale,

    let isAnimating = false; // Track if animation is in progress
    const swapCards = (newPositions: []) => {
      const el = containerRef.current;

      el.forEach((item, i) => {
        // Animate each card
        gsap.to(item, {
          // opacity: 0,
          // duration: 4,
          // delay: i * 0.5,
          // repeat: -1,
          // stagger: 0.5,

          onStart: () => {
            console.log(i, 'start')
            if(i == 0){
              gsap.to( `#target-${i}`, {rotateZ: -25,  duration: 1, ease: "power2.inOut", skewX:-11, skewY: 27, x:newPositions[i].translateX - 300, y:newPositions[i].translateY - 50, opacity:0});
            }
            if(i == 1){
              gsap.to( `#target-${i}`, { duration: 1, ease: "power2.inOut",  x:newPositions[i-1].translateX-400, y:newPositions[i-1].translateY - 10, opacity:1, rotateZ: newPositions[i-1].rotateZ, scale: newPositions[i-1].scale});
            }
            if(i==2){
              gsap.to( `#target-${i}`, { duration: 1, ease: "power2.inOut",  x:newPositions[i-1].translateX-400, y:newPositions[i-1].translateY - 10, opacity:1, rotateZ: newPositions[i-1].rotateZ, scale: newPositions[i-1].scale});
            }
          },
          onComplete: () => {
            // if(i > 0){
            //   gsap.to( `#target-${i}`, {rotateZ: -25,  duration: 1, ease: "power2.inOut", skewX:-11, skewY: 27, x:newPositions[i].translateX - 300, y:newPositions[i].translateY - 50, opacity:0});
            // }
            console.log('completed')
            // const firstItem = newPositions.shift();
            // newPositions.push(firstItem);
            // console.log(newPositions, 'newpositi')

          }
        })

      });


    };


  }, []);


  // useGSAP(() => {
  //   // gsap code here...
  //   console.log('gsap')
  //   gsap.to( `#target-${1}`, {x: -200}); // <-- automatically reverted

  // });


  return (

    <Flipper flipKey={items.map(item => item.id).join("")}>
      <div className="section__container" ref={scope}>
        <div className="section__layoutContainer">
          <div className="section__layout">
            <div className='grid grid-cols-3 gap-2 relative EnterpriseHubHeroCardFan__content'  >
              {items.slice(0, 3).map((data, index) => (

                <Flipped flipId={data.id} key={data.id} stagger="card" shouldInvert={shouldFlip} >
                  <div ref={(el) => (containerRef.current[index] = el)} id={`target-${index}`}
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
