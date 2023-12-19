'use client'
import { useEffect, useState } from 'react';
import getProduct from './get-product';
import { Product } from '@/types';


// Custom hook to fetch multiple products by their IDs
export const useFetchProducts = (productIds: string[]) => {
    // State to store the fetched products
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productPromises = productIds.map(async (id) => {
                try {
                    const product = await getProduct(id);
                    return product; // This will be of type 'Product' or 'undefined'
                } catch (error) {
                    console.error('Failed to fetch product with ID:', id, error);
                    return undefined; // Explicitly return 'undefined' for failed requests
                }
            });

            const fetchedProducts = await Promise.all(productPromises);
            // Filter out 'undefined' values and update the state
            // The filter method ensures that only 'Product' types are included in the array
            setProducts(fetchedProducts.filter((product): product is Product => product !== undefined));
        };

        if (productIds.length > 0) {
            fetchProducts();
        }
    }, [productIds]);

    return products;
};
