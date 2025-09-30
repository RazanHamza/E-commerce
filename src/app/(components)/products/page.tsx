import React from 'react';
import getAllProducts from "@/Api/product.api"
import { ProductType } from "../../interface/product.interface";
import ProductDetails from '@/app/_components/productCart/page';
export default async function Products() {
    let dataList = await getAllProducts();
  
    return (
        <div className='container w-[90%] mx-auto my-10'>
            <div className='flex flex-wrap'>
                {dataList.map((product: ProductType) => (
                    <ProductDetails key={product._id} product={product}></ProductDetails>
                )
                )}

            </div>

        </div>
    )
}
