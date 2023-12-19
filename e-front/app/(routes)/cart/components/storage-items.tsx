'use client'
import getProduct from '@/actions/get-product';
import { ProductStorage, Product } from '@/types';
import React, { use, useEffect, useState } from 'react'
import CartItem from './cart-item';
import { useFetchProduct } from '@/actions/fetchSingleProducts';
import Loader from '@/components/loader';
interface ProductStorageProps {
    data: ProductStorage;
}

const storageItems:React.FC<ProductStorageProps> =  ({
    data
}) => {

  const { product, isLoading } = useFetchProduct(data.id);

  return (
    <div> {isLoading ? (
      <Loader />
    ) : (
      <ul>
      {/* <CartItem key={item.id} data={item}></CartItem> */}
                          {/* {favorites.wishlist.map((item) => (
                              <CartItem key={item.id} data={item}></CartItem>
                          ))} */}

                          {product && <CartItem key={product.id} data={product}></CartItem>}
                      </ul>
    )}
   
    </div>
  )
}

export default storageItems
