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

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
    title,
    items
}) => {
    const containerRef = useRef(null);
     const context = useContext(CursorContext);
    // if (!context) {
    //     throw new Error('MyComponent must be used within a CursorContextProvider');
    // }
    // const { position, setPosition } = context;
console.log('position', context)
//       const [position, setPosition] = useState({
//     clientX: 0,
//     clientY: 0,
//   });
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
//     })[containerRef]

    useEffect(() => {
        const containerElement_ = containerRef.current;
    
        if (!containerElement_) {
          // If not, return a function that does nothing
          return () => {};
        }
        const { left, top } = containerElement_.getBoundingClientRect();
    }, [containerRef]);
    // console.log('clientX', clientX)
    // console.log('clientY', clientY)
    return (
        <Container>
           
           <CursorContextProvider>
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
                        {/* <Cursor /> */}
                       
                        {items.slice(0, 10).map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
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

                    {/* <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-xl overflow-hidden">
                       <ProductCard key={item.id} data={item}></ProductCard>
                    </div>
                ))}
            </div> */}
                </div>
                </CursorContextProvider>

        </Container>
    );
}

export default ProductList;