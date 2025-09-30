"use client"

import { getloggedUserCart } from "@/Api/cartAction/getLoggedUserCart.api"
import { createContext, useState, useEffect } from "react"

export const cartItemContext = createContext<null | any>(null)

export function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [dataDetails, setDetails] = useState<number>(0)

  async function getDetails() {
    try {
      const res = await getloggedUserCart()
      console.log("context cart:", res)
      setDetails(res.numOfCartItems || 0) 
    } catch (err) {
      console.error("Error fetching cart:", err)
      setDetails(0)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  return (
    <cartItemContext.Provider value={{ dataDetails, setDetails, getDetails }}>
      {children}
    </cartItemContext.Provider>
  )
}
