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

interface ProductListProps {
    title: string;
    items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
    title,
    items
}) => {
    return (
        <div className="space-y-4">
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

                // autoplay={true}

                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
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
    );
}

export default ProductList;