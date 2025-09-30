"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function clearCart() {
  const token = await getMyToken();


 

  const headers:any = {
    token: token,
    "Content-Type": "application/json",
  };
  if (token) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "DELETE",
      headers: headers,
  
    });

    const data = await res.json();
    return data;
  }

}
