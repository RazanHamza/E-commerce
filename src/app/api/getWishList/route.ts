import getMyToken from "@/utilities/getMyToken";

export async function GET() {
  try {
    const token = await getMyToken();
    if (!token) return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } });

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Wishlist fetch error:", text);
      return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const data = await res.json();
    const productIds = data.data?.map((item: any) => item.product._id) || [];
    return new Response(JSON.stringify(productIds), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } });
  }
}
