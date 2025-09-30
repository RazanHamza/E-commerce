"use client";
import clearCart from "@/Api/cartAction/clearAllCart.api";
import { getloggedUserCart } from "@/Api/cartAction/getLoggedUserCart.api";
import RemoveItem from "@/Api/wishListAction/removeItem.api";
import UpdateCart from "@/Api/cartAction/updateCart.api";
import { cartItemContext } from "@/app/context/cartItemContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { id } from "zod/v4/locales";
import Link from 'next/link';


export default function Cart() {
    const [cartId, setId] = useState<string>('')
    const [cartlist, setList] = useState<any[]>([]);
    const [totalPrice, setPrice] = useState(0);
    const { setDetails } = useContext(cartItemContext)

    async function updatCart(id: string, count: number) {
        if (count < 1) return;
        let res = await UpdateCart(id, count);
        console.log("UpdateCart:", res);
        getCartData();
        toast.success('product updated ..', {
            position: "top-center",
            duration: 2000
        }

        )
    }
    async function removeProduct(id: string) {
        try {
            let res = await RemoveItem(id)
            toast.success('product deleted successfully ..', {
                position: "top-center",
                duration: 2000
            }
            )
            getCartData()
        }
        catch (err) {
            toast.error('there is an error with delete this prouct..', {
                position: "top-center",
                duration: 2000
            }

            )

        }

    }


    function clearAllCart() {
        clearCart()
        getCartData()
    }

    async function getCartData() {
        let res = await getloggedUserCart();
        console.log("Cart response:", res);
        setId(res.cartId)
        setList(res.data?.products || []);
        setDetails(res.numOfCartItems)
        setPrice(res.data?.totalCartPrice || 0);
    }

    useEffect(() => {
        getCartData();
    }, []);

    return (
        <div className="container w-[90%] mx-auto my-20">
            <div className="flex flex-wrap ">
                <div className="lg:w-3/4 sm:w-full">
                    <button className="bg-red-700 cursor-pointer text-white px-7 py-2 rounded-md"
                        onClick={() => clearAllCart()}
                    > Clear Cart</button>
                    <div className="relative overflow-x-auto m-3 shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-16 py-3"><span className="sr-only">Image</span></th>
                                    <th className="px-6 py-3">Product</th>
                                    <th className="px-6 py-3">Qty</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartlist.map((item) => (
                                    <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <img
                                                src={item.product.imageCover}
                                                alt={item.product.title}
                                                className="w-16 md:w-32 max-w-full max-h-full"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {item.product.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => updatCart(item.product._id, item.count - 1)}
                                                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                                    type="button"
                                                >
                                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item.count}
                                                    readOnly
                                                    className="bg-gray-50 w-14 border text-center text-sm rounded-lg"
                                                />

                                                <button
                                                    onClick={() => updatCart(item.product._id, item.count + 1)}
                                                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                                    type="button"
                                                >
                                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            ${item.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => removeProduct(item.product._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="w-1/4">
                    <div className="w-full max-w-sm bg-white border rounded-lg shadow-sm">
                        <div className="px-5 pb-5">
                            <h5 className="text-xl font-semibold">Total Price :</h5>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold">{totalPrice}</span>
                                <Link href={`/checkout/${cartId}`} ><button className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Pay Now
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
