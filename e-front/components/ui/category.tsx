"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import { Category, Product } from "@/types";
import Image from "next/image";
import gsap from 'gsap';
import { Flipper, Flipped, spring } from 'react-flip-toolkit';
import { motion, useAnimate, useInView, useScroll} from "framer-motion";
import { useGSAP } from "@gsap/react";
import { posix } from 'path';
import getBillboard from '@/actions/get-billboard';

interface CategoryProps {
  items: Category[];
  // data: Category[];
}

interface Animation {
  translateX: number;
  translateY: number;
  rotateZ: number;
  scale: number;
}

export interface Billboard {
  // Define the properties of Billboard
  imageUrl: string;
};


const CategoryCard: React.FC<CategoryProps> = ({
  items
}) => {
  // gsap.registerPlugin(Flip);
  // const containerRef = useRef(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerMain = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPositions, setCurrentPositions] = useState([]);
  const [inView, setInView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [updatedCategories, setUpdatedCategories] = useState<Category[]>([]);
  // const { scrollYProgress } = useScroll();
  // console.log('scrollYProgress', scrollYProgress)
  const isInView = useInView(containerMain, { 
    margin: "-10% 0px", // Adjust the top margin as needed
    threshold: 0.5 // Adjust the threshold as needed, 0.5 means 50% of the element must be visible
  });
useEffect(() => {

  const fetchData = async () => {
    setLoading(true)
    try {
      let newCategories: Category[] = [];
      // Fetch categories
      for (const item of items) {
        console.log('item', item.billboardId);
        const fetchedBillboard = await getBillboard(item.billboardId);
        console.log('fetchedBillboard', fetchedBillboard.imageUrl);

         // Update the item with the imageUrl
         let newCategory: Category = {
          ...item,
          imageUrl: fetchedBillboard.imageUrl
        };

        newCategories.push(newCategory);
        // Process or store the fetched billboard data
      }
      setUpdatedCategories(newCategories);
      setLoading(false);
    }
      catch (error) {
        console.error("Error fetching data:", error);

      }
    }
    setInView(isInView)
    fetchData();
  // console.log("Element is in view: ", isInView)
  // const billboards = await getBillboard(billboard_id);
  
}, [isInView, setInView, items])

console.log(updatedCategories,'updatedCategories')

  const offset = 30;
  // Define initial and final positions for the card stack
  const cardStack = [
    { id: 'card1', translateX: 0, translateY: 0, zIndex: 3 }, // Top card
    { id: 'card2', translateX: 0, translateY: -50, zIndex: 2 },
    { id: 'card3', translateX: 0, translateY: -100, zIndex: 1 }, // Bottom card
  ];

  const container = containerRef.current;
  let animations = [
    { translateX: 1025, translateY: -713.896, rotateZ: 0, scale: 1 },
    { translateX: 764.667, translateY: -649.669, rotateZ: 8.33333, scale: 0.833333 },
    { translateX: 511.345, translateY: -585.442, rotateZ: 16.6667, scale: 0.666667 },
  ];



  const shouldFlip = (prev: any, current: any) => {
    // Example logic: flip if the IDs are different (you'll need to replace this with your actual logic)
    if (prev.type !== current.type) {
      return true;
    }
    return false;
  };

  // useEffect(() => {
  //   // console.log("Element is in view: ", isInView)
  // if(isInView){
  //     animations.forEach((anim, i) => {
  //       const el = containerRef.current[i];
  //       if (el) {
  //         spring({
  //           config: 'gentle',
  //           values: {
  //             translateX:0, translateY:0, rotateZ:0, scale:1
  //           },
  //           onUpdate: ({ translateX, translateY, rotateZ, scale }) => {
  //             el.style.opacity = '1';
  //             el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`;
  //             el.style.top = '40%';
  //             el.style.right = '90%';
  //           },
  //           onComplete: () => {
  //             const nextIndex = (currentIndex + 1) % animations.length;
  //             anim = {
  //               translateX: anim.translateX,
  //               translateY: anim.translateY,
  //               rotateZ: anim.rotateZ,
  //               scale: anim.scale,
  //             }
  //             if (i === animations.length - 1) {
  //               console.log('animateCards complete')

  //             }
  //           },
  //           delay: i * 250,
  //         });
  //       }
  //     });
  //   }
  // }, [isInView])


  useGSAP(() => {

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

              // Add transition properties
            },
            onComplete: () => {
              anim = {
                translateX: anim.translateX,
                translateY: anim.translateY,
                rotateZ: anim.rotateZ,
                scale: anim.scale,
              }
              if (i === animations.length - 1) {
                console.log('animateCards complete')

              }
            },
            delay: i * 250,
          });
        }
      });
    };

    const resetAnimations = () => {
      animations.forEach((anim, i) => {
        const el = containerRef.current[i];
        if (el) {
          spring({
            config: 'veryGentle',
            values: {
              translateX: [currentPositions[i] || 0, 0],
              translateY: [currentPositions[i] || 0, 0],
              rotateZ: [currentPositions[i] || 0, 0],
              scale: [currentPositions[i] || 1, 1],
            },
            onUpdate: ({ translateX, translateY, rotateZ, scale }) => {
         
              el.style.opacity = '1';
              el.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale}) `;
              el.style.top = '0';
              el.style.right = 'unset';
              // el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            },
            onComplete: () => {
              anim = {
                translateX: anim.translateX,
                translateY: anim.translateY,
                rotateZ: anim.rotateZ,
                scale: anim.scale,
              }
              if (i === animations.length - 1) {
                console.log('animateCards complete')

              }
            },
            delay: i * 250,
          });
        }
      });

    }



    if(!isInView ){
      console.log('not in the view')
      animateCards();
    }else {
      console.log('is it in view?')
      resetAnimations()
    }
   

  
  }, [isInView ]);




  return (

    <Flipper flipKey={updatedCategories.map(item => item.id).join("")}>
      <div className="section__container">
        <div className="section__layoutContainer">
          <div className="section__layout"  ref={el => {
      // Update the ref to point to the current element
      if (el && !containerMain.current.includes(el)) {
        containerMain.current.push(el);
      }
    }} >
            <div className='grid grid-cols-3 gap-2 relative EnterpriseHubHeroCardFan__content' >
              {updatedCategories.slice(0, 3).map((data, index) => (

                <Flipped flipId={data.id} key={data.id}    stagger="card" shouldInvert={shouldFlip}>
                  <div ref={(el) => (containerRef.current[index] = el)} id={`target-${index}`}
                    style={{
                      position: 'relative',
                      // Adjust the top property based on index to stack cards
                      // top: `${index * -30}px`,
                      //   left: '50%',
                      // transform: 'translate(-50%, 0)',
                      width: '300px',
                      zIndex: 3 - index, // Ensure correct stacking order
                    }}
                    className="EnterpriseHubHeroCard square bg-white rounded-xl shadow-xl overflow-hidden mb-10">
                    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                      <div className="aspect-square rounded-xl bg-gray-100 relative">
                        {/* <Image src={data?.images?.[0]?.url} fill alt='image' className="max-h-full"></Image> */}
                        <Image src={data?.imageUrl} layout="fill" objectFit="cover" alt='image' className="absolute top-0 left-0 w-full h-full"></Image>


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
