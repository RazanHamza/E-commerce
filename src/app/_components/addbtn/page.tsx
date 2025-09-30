"use client"
import AddToCart from '@/Api/cartAction/addProductCart.api';
import { cartItemContext } from '@/app/context/cartItemContext';
import React, { useContext } from 'react';
import { toast } from 'sonner';

export default function Addbtn({ id }: { id: string }) {
  const { setDetails } = useContext(cartItemContext);

  async function addProductToCart() {
    let res = await AddToCart(id);
    if (res.status === "success") {
      setDetails(res.numOfCartItems); 
      toast.success(res.message, {
        position: "top-center",
        duration: 2000
      });
    }
    console.log("AddProduct", res);
  }

  return (
    <div>
      <button
        onClick={addProductToCart}
        className='btn cursor-pointer group-hover:translate-y-[0%] translate-y-[140%] transition-all duration-200'
      >
        + Add
      </button>
    </div>
  );
}
