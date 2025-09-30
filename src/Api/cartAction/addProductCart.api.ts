"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function AddToCart(id: string) {
  const token = await getMyToken();


  const payload = {
    productId: id,
  };

  const headers:any = {
    token: token,
    "Content-Type": "application/json",
  };
  if (token) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  }

}
