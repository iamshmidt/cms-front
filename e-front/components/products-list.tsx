"use client"
import { Product } from "@/types";
import NoResults from "./ui/no-results";
import ProductCard from "./ui/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle, ChevronLeft, ChevronRight, Sun } from "lucide-react";
import Container from "./ui/container";
import Cursor from "./ui/cursor";
import useMousePosition from "@/hooks/use-mouse-position";
import { useContext, useEffect, useRef, useState } from "react";
import CursorContextProvider, { CursorContext } from "@/context/cursor-context";
import AnimatedCursor from "react-animated-cursor"
interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
    title,
    items
}) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    //  const context = useContext(CursorContext);
    // if (!context) {
    //     throw new Error('MyComponent must be used within a CursorContextProvider');
    // }
    // const { position, setPosition } = context;
// console.log('position', context)
    useEffect(() => {
        // Function to reset cursor style
        const resetCursor = () => {
            document.body.style.cursor = 'auto'; // Reset to the default cursor
        };

        if (!isHovered) {
            resetCursor();
        }

        // Clean up function to reset cursor when component unmounts or when cursor is not hovered
        return () => {
            resetCursor();
        };
    }, [isHovered]);
      const [position, setPosition] = useState({
    clientX: 0,
    clientY: 0,
    inView: false,
  });
    // const { clientX, clientY } = useMousePosition(containerRef);
//   useEffect(() => {
//     // Check if the ref is currently pointing to a node
//     const containerElement = containerRef.current;
    
//     if (!containerElement) {
//       // If not, return a function that does nothing
//       return () => {};
//     }

//     // Define the event listener
//     const updatePosition = (event:MouseEvent) => {
//       const { left, top } = containerElement.getBoundingClientRect();
//       const clientX = event.clientX - left;
//       const clientY = event.clientY - top;

//       setPosition({ clientX, clientY });
//     };


//     useEffect(() => {
//         const containerElement_ = containerRef.current;
    
//         if (!containerElement_) {
//           // If not, return a function that does nothing
//           return () => {};
//         }
//         const updatePosition = (event:MouseEvent) => {
//                 const { left, top } = containerElement_.getBoundingClientRect();
//       const clientX = event.clientX - (left-100);
//       const clientY = event.clientY - (top-400);

//       setPosition({ clientX, clientY, inView: true});
//     };

//         containerElement_.addEventListener('mousemove', updatePosition, false);

//         return () => {
//           containerElement_.removeEventListener('mousemove', updatePosition);
//         };
//     }, [containerRef, setPosition]);
//     // console.log('clientX', clientX)
//     // console.log('clientY', clientY)
// //OUTOF VIEW = RESET POSITION
//     console.log('position', position)
    return (
        <Container>
             <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ position: 'relative' }} // Ensure your component has a positioning context
        >
          {isHovered && (
                <AnimatedCursor
                    innerSize={200}
                    outerSize={0}
                    innerScale={1}
                    outerScale={1.7}
                    outerAlpha={0}
                    outerStyle={{
                        // background: 'radial-gradient(circle, rgba(173, 216, 230, 1) 0%, rgba(173, 216, 230, 0) 70%)', // Light blue to transparent gradient
                        // boxShadow: '0 0 8px rgba(173, 216, 230, 0.5)', // Optional: soft glow to enhance the effect
                        // border: 'none', // No border for this style
                        // backdropFilter: 'blur(5px)', // Soften the edges with blur
                        // borderRadius: '50%', 
                        // zIndex: -1,
                        // Ensure the cursor is positioned relative to your component
                        // position: 'absolute',
                    }}
                    innerStyle={{
                        // backgroundColor: 'var(--cursor-color)'
                        background: 'radial-gradient(circle, rgba(173, 216, 230, 1) 0%, rgba(173, 216, 230, 0) 70%)', // Light blue to transparent gradient
                        boxShadow: '0 0 8px rgba(173, 216, 230, 0.5)', // Optional: soft glow to enhance the effect
                        border: 'none', // No border for this style
                        backdropFilter: 'blur(5px)', // Soften the edges with blur
                        borderRadius: '50%', 
                        zIndex: -1,
                    }}
                />
            )}
           {/* <CursorContextProvider> */}
                <div className="space-y-4" ref={containerRef}>
                    <h3 className="font-bold text-3xl">{title}</h3>
                    {items.length === 0 && <NoResults></NoResults>}
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={4}
                        navigation={{
                            nextEl: ".swiper-custom-next",
                            prevEl: ".swiper-custom-prev"
                        }}
                        breakpoints={{
                            // when window width is <= 640px
                            200: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            420: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            // when window width is <= 768px
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10
                            },
                            // when window width is <= 1024px
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 10
                            },
                        }}
                        // autoplay={true}

                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    > 
                        {/* <Cursor positions={position} /> */}
                       
                        {items.slice(0, 10).map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="bg-transparent rounded-xl shadow-xl overflow-hidden mb-10">
                                    <ProductCard data={item} />
                                </div>
                            </SwiperSlide>
                        ))}

                
                    </Swiper>

                    <button className="swiper-custom-prev absolute top-[40%] z-10 -left-[9px]">
                        <ChevronLeft size={40} color="#737373" />
                    </button>
                    <button className="swiper-custom-next absolute top-[40%] z-10 -right-[9px]">
                        <ChevronRight size={40} color="#737373" />
                    </button>

              
                </div>
                {/* </CursorContextProvider> */}
                </div>
        </Container>
    );
}

export default ProductList;