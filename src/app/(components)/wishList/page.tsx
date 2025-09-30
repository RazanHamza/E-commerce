"use client";
import React, { useEffect, useState } from "react";
import { getloggedUserWhishList } from "@/Api/wishListAction/getLoggedUserWishList.api";
import RemoveItem from "@/Api/wishListAction/removeItem.api";

interface IProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  brand: { name: string };
  category: { name: string };
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    const res: any = await getloggedUserWhishList();
    if (res.status === "success") {
      setWishlist(res.data || []);
    } else {
      console.error(res.message);
      setWishlist([]);
    }
    setLoading(false);
  };

  const handleRemove = async (id: string) => {
    const res: any = await RemoveItem(id);
    if (res.status === "success") {
      fetchWishlist();
    } else {
      console.error(res.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <img
                src={product.imageCover}
                alt={product.title}
                className="mb-2 w-full h-48 object-cover rounded"
              />
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-500 text-sm">{product.brand.name}</p>
              <p className="text-gray-400 text-sm mb-2">{product.category.name}</p>
              <p className="font-bold mb-2">${product.price}</p>
              <button
                onClick={() => handleRemove(product._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
