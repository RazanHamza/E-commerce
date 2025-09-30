"use client"
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { cartItemContext } from '@/app/context/cartItemContext';
import AddToCart from '@/Api/cartAction/addProductCart.api';
import AddToWishList from '@/Api/wishListAction/addToWishList.api';
import { getloggedUserWhishList } from '@/Api/wishListAction/getLoggedUserWishList.api';
import { ProductType } from '@/app/interface/product.interface';
import Addbtn from '../addbtn/page';

type Props = {
    product: ProductType;
};

export default function ProductDetails({ product }: Props) {
    const { setDetails } = useContext(cartItemContext);
    const [isWished, setIsWished] = useState(false);

    useEffect(() => {
        const checkWish = async () => {
            const res: any = await getloggedUserWhishList();
            if (res.status === "success") {
                const productIds = res.data.map((p: ProductType) => p._id);
                if (productIds.includes(product._id)) {
                    setIsWished(true);
                }
            }
        };
        checkWish();
    }, [product._id]);

    async function addProductToCart() {
        const res = await AddToCart(product._id);
        if (res.status === "success") {
            setDetails(res.numOfCartItems);
            toast.success(res.message, { position: "top-center", duration: 2000 });
        } else {
            toast.error(res.message || "Failed to add to cart", { position: "top-center" });
        }
    }

    async function toggleWish() {
        try {
            const res = await AddToWishList(product._id);
            if (res.status === "success") {
                setIsWished(true); 
                toast.success("Added to WishList", { position: "top-center", duration: 2000 });
            } else {
                toast.error(res.message || "Failed to add to WishList", { position: "top-center", duration: 2000 });
            }
        } catch (error: any) {
            console.error("Wishlist error:", error);
            toast.error("Something went wrong", { position: "top-center" });
        }
    }

    return (
        <div className='lg:w-[25%] md:w-[50%]'>
            <div className='border group overflow-hidden hover:border-green-700 hover:shadow-sm hover:shadow-green-700 border-gray-300 m-5 rounded-md p-4'>
                <Link href={`/products/${product._id}`}>
                    <img src={product.imageCover} alt={product.title} />
                    <h4 className='text-green-700'>{product.title}</h4>
                    <h3 className='text-xl font-medium'>{product.category.name}</h3>
                    <div className='flex py-3 flex-wrap items-center justify-between'>
                        <div>
                            <span>{product.price} Egp</span>
                        </div>
                        <div className='flex items-center'>
                            <p>{product.ratingsAverage}</p>
                            <i className='fas fa-star text-amber-300'></i>
                        </div>
                    </div>
                </Link>

                <button onClick={toggleWish} className='text-2xl'>
                    <i className={`fa-solid fa-heart cursor-pointer transition-colors duration-300 ${isWished ? "text-red-500" : "text-gray-400"}`}></i>
                </button>

                <Addbtn id={product._id} />
            </div>
        </div>
    );
}
