"use client"
import { Product, ProductStorage } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import BadgeAlert from "../badge-alert";
import { Swiper, SwiperSlide } from "swiper/react";


interface ProductCard {
    data: Product;
}
const ProductCard: React.FC<ProductCard> = ({
    data
}) => {

    const previewModal = usePreviewModal();
    const router = useRouter();

    const cart = useCart();
    const wishlist = useCart();

    const [heartColor, setHeartColor] = useState('#fff');
    const cursorRef = useRef<HTMLDivElement>(null);

    const newStorageItem: ProductStorage = {
        id: data.id,
        amount: data.amount
    };

    // const storageData:ProductStorage[] = 

    useEffect(() => {
        setHeartColor(wishlist.isItemInWishlist(data) ? '#ef4444' : '#fff');
    }, [data, wishlist]);

    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(newStorageItem);
    }

    const onLike: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
      

        wishlist.addToWishlist(newStorageItem);
        if (wishlist.isItemInWishlist(newStorageItem)) {
            setHeartColor('#ef4444')
        } else {
            setHeartColor('#fff')
        }

    }


    return (
        <div onClick={handleClick} className="bg-transparent group cursor-pointer rounded-xl border p-3 space-y-4">
           
            <div className="aspect-square rounded-xl bg-blue-300 backdrop-blur-sm bg-opacity-10  ">
                {/* <Image src={data?.images?.[0]?.url} fill alt='image' className="max-h-full"></Image> */}
                <Image src={data?.images?.[0]?.url} layout="fill" objectFit="cover" alt='image' className="transition-transform transform hover:scale-110 absolute top-0 left-0 w-full h-full"></Image>


                <div className="absolute w-full px-6 top-5">
                    <div className="flex gap-x-6 justify-end">
                        <IconButton
                            onClick={onLike}
                            icon={<Heart size={20} fill={heartColor} />}
                        />
                    </div>
                </div>
                <div className="lg:opacity-0 sm:opacity-1 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600" />}
                        />
                        {data.quantity > 0 ? <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                        /> : null}

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
                <Currency value={data?.price} priceWithDiscount={data?.priceAfterDiscount} />
                {data.quantity === 0 ? <BadgeAlert title="Out of stock" description="Out of stock" variant="outOfStock"></BadgeAlert> : null}
                {data.discount > 0 && data.quantity !== 0 && parseInt(data.price, 10) > data.discount ? <BadgeAlert title="Discount" description={`${data.discount}% off`} variant="sale"></BadgeAlert> : null}
            </div>
        </div>
    );
}

export default ProductCard;