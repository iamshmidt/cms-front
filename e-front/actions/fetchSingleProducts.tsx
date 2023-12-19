'use client'
import { useEffect, useState } from 'react';
import getProduct from './get-product';
import { Product } from '@/types';
// export const useFetchProduct = (productId: string) => {
//     const [product, setProduct] = useState<Product | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true); // Add a loading state

//     useEffect(() => {
//         const fetchProduct = async () => {
//             setIsLoading(true); // Set loading to true before fetching
//             try {
//                 const fetchedProduct = await getProduct(productId);
//                 setProduct(fetchedProduct);
//             } catch (error) {
//                 console.error("Error fetching product:", error);
//                 // Optionally, handle the error state here
//             }
//             setIsLoading(false); // Set loading to false after fetching
//         };

//         fetchProduct();
//     }, [productId]);

//     return { product, isLoading }; // Return both product and loading state
// };

export const useFetchProduct = (productId:string) => {
    const [product, setProduct] =  useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
                        setIsLoading(true); // Set loading to true before fetching
            try {
                const fetchedProduct = await getProduct(productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error("Error fetching product:", error);
                // Optionally, handle the error state here
            }
            setIsLoading(false); // Set loading to false after fetching
        };

        fetchProduct();
    }, [productId]);

    return {product, isLoading};
};
