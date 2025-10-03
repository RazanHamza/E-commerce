"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

interface IProduct {
  title: string;
  imageCover: string;
}

interface ICartItem {
  _id: string;
  count: number;
  price: number;
  product: IProduct;
}

interface IOrder {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: ICartItem[];
}

interface DecodedToken {
  id: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      if (status !== "authenticated" || !session?.token) {
        setLoading(false);
        return;
      }

      const decoded = jwtDecode<DecodedToken>(session.token);

      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          }
        );
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [session, status]);

  if (loading) return <p className="text-center my-10">Loading orders...</p>;
  if (!orders.length) return <p className="text-center my-10">No orders found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded shadow bg-white">
            <p>
              <strong>Total:</strong> {order.totalOrderPrice} EGP
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentMethodType}
            </p>
      
            <h3 className="mt-3 font-semibold">Items:</h3>
            <ul className="space-y-2">
              {order.cartItems.map((item) => (
                <li key={item._id} className="flex items-center space-x-4">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>
                    {item.product.title} - {item.price} EGP × {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
