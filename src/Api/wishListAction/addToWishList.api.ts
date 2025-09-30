"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function AddToWishList(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      return { status: "error", message: "User not authenticated" };
    }

    const payload = { productId: id };

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text(); 
      console.error("Wishlist API error:", text);
      return { status: "error", message: "Failed to add to wishlist" };
    }

    const data = await res.json();
    return data;

  } catch (error: any) {
    console.error("AddToWishList error:", error.message);
    return { status: "error", message: error.message };
  }
}
