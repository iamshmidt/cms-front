"use client"
import React, { use, useEffect, useRef, useState } from 'react'
import { Category, Product } from "@/types";
import Image from "next/image";
import gsap from 'gsap';
import { Flipper, Flipped, spring } from 'react-flip-toolkit';
import { motion, useAnimate, useInView, useScroll } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { posix } from 'path';
import getBillboard from '@/actions/get-billboard';
import { IoIosArrowForward } from "react-icons/io";
import Container from './container';

interface CategoryProps {
  items?: Category[];
  loadingCanvas?: boolean;
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
  items,
  loadingCanvas
}) => {
  // gsap.registerPlugin(Flip);
  // const containerRef = useRef(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerMain = useRef<HTMLDivElement[]>([]);
  const emptyContainer = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPositions, setCurrentPositions] = useState([]);
  const [windowWidth, setWindowWidth] = useState<number>(()=>{
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  
  });
  const [loading, setLoading] = useState(true);
  const [initLoading, setInitLoading] = useState(true)
  const [stopAnimation, setStopAnimation] = useState(false);
  const [updatedCategories, setUpdatedCategories] = useState<Category[]>([]);
  // const { scrollYProgress } = useScroll();
  // console.log('scrollYProgress', scrollYProgress)
  const isInView = useInView(containerMain, {
    threshold: 0.9// Adjust the threshold as needed, 0.5 means 50% of the element must be visible
  });
  const isInViewTop = useInView(emptyContainer, {
    margin: '100px 0px',
    threshold: 0.2// Adjust the threshold as needed, 0.5 means 50% of the element must be visible
  });
  // Adjust the top margin as needed


  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  // Scroll event handler
  const onScroll = () => {
    let currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos > lastScrollTop) {
      // Scrolling down
      console.log('Scrolling down');
      // setInView(true)
      setScrollDirection('down')
    } else {
      // Scrolling up
      // setInView(false)
      console.log('Scrolling up');
      setScrollDirection('up')
    }
    // Set the new scroll position
    setLastScrollTop(currentScrollPos <= 0 ? 0 : currentScrollPos); // For Mobile or negative scrolling
  };

  useEffect(() => {
    // Add scroll event listener when the component is mounted
    window.addEventListener('scroll', onScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [lastScrollTop]);

  const animateCards = () => {
    setStopAnimation(true);
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
            el.style.top = '0%';
            el.style.right = '115%';
            el.style.transition = 'unset';
          },
          onComplete: () => {
            
            anim = {
              translateX: anim.translateX,
              translateY: anim.translateY,
              rotateZ: anim.rotateZ,
              scale: anim.scale,
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
          config: 'gentle',
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
            el.style.transition = 'transform 0.5s';
          },
          onComplete: () => {
           
            anim = {
              translateX: anim.translateX,
              translateY: anim.translateY,
              rotateZ: anim.rotateZ,
              scale: anim.scale,
            }
            if (i === animations.length - 1) {
              console.log('animateCards complete');
            }
          },
          delay: i * 250,
        });
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let newCategories: Category[] = [];
        for (const item of items) {
          const fetchedBillboard = await getBillboard(item.billboardId);
          let newCategory: Category = {
            ...item,
            imageUrl: fetchedBillboard.imageUrl
          };
          newCategories.push(newCategory);
        }
        setUpdatedCategories(newCategories);
      }
      catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        if (!loadingCanvas &&  windowWidth > 1220) {
          animateCards();
          setInitLoading(false);
        }
      }
    }
    fetchData();
  }, [items, windowWidth]);
  
  useEffect(() => {
    if (!initLoading && windowWidth > 1220) {
      if( isInView && isInViewTop&&scrollDirection === 'down') {
        resetAnimations();
      } else if(!isInView&&isInViewTop && scrollDirection === 'up'){
animateCards();
      }
    }
  }, [isInView, scrollDirection, stopAnimation, isInViewTop, windowWidth]);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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




  // useGSAP(() => {

  // }, [isInView]);




  return (
    <Container>
      <div className=""ref={emptyContainer}></div>
      <Flipper flipKey={updatedCategories.map(item => item.id).join("")}>
        <div className="section__container">
          <div className="section__layoutContainer">
            <div className="section__layout" ref={el => {
              // Update the ref to point to the current element
              if (el && !containerMain.current.includes(el)) {
                containerMain.current.push(el);
              }
            }} >
              <div className='grid grid-cols-3 gap-2 relative EnterpriseHubHeroCardFan__content' >
                {updatedCategories.slice(0, 3).map((data, index) => (

                  <Flipped flipId={data.id} key={data.id} stagger="card" shouldInvert={shouldFlip} >
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
                      className="EnterpriseHubHeroCard square bg-white  shadow-xl overflow-hidden mb-10 ">
                      <div className="bg-white group cursor-pointer rounded-top-xl border p-3 space-y-4 ">
                        <div className="aspect-square  bg-gray-100 relative AccentedCard__shadow">
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
                          <p className="font-semibold text-lg text-slate-900 uppercase">
                            {data.name}
                          </p>
                          {/* <Link></Link> */}
                          <div className="">
                            <div className="flex text-s text-gray-500 items-center">
                              {/* {data?.category?.name} */}
                              <span className="text-[#0c7bb3]">Learn More </span><div>
                                <svg className="HoverArrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                                  <g fillRule="evenodd">

                                    <path className="HoverArrow__linePath" d="M0 5h7"></path>
                                    <path className="HoverArrow__tipPath" d="M1 1l4 4-4 4"></path>

                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <h1>hello</h1>
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
    </Container>
  )
}

export default CategoryCard
