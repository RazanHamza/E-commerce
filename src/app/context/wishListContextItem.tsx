"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface WishListContextType {
  wishList: string[];
  setWishList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const WishListContextItem = createContext<WishListContextType>({
  wishList: [],
  setWishList: () => {},
});

export const WishListProvider = ({ children }: { children: ReactNode }) => {
  const [wishList, setWishList] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishList(JSON.parse(stored));
  }, []);


  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  return (
    <WishListContextItem.Provider value={{ wishList, setWishList }}>
      {children}
    </WishListContextItem.Provider>
  );
};
