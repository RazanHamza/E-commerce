"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: code }), 
        }
      );

      const data = await res.json();

      if (res.ok && data.status === "Success") {
        setMessage("Code verified successfully ");
        setTimeout(() => router.push("/resetpassword"), 1500);
      } else {
        setMessage(data.message || "Invalid code");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="container w-[50%] mx-auto my-20 bg-gray-100 rounded-md p-10">
      <h1 className="text-2xl text-green-700 text-center mb-6">Verify Code</h1>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="Enter the code from your email"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-md"
        >
          Verify Code
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
