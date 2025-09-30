"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/app/schema/checkout.schema";
import { onlinePayment } from "@/Api/payment/checkout.api";
import { useParams } from "next/navigation";

export default function Checkout() {
  const {id} :{id:string}= useParams()
  const form = useForm({
  defaultValues: {
    details: "",
    phone: "",
    city: "",
  },
  resolver: zodResolver(checkoutSchema),
});


  async function handlePayment(value: any) {

  const data=await onlinePayment(value,id)
  console.log(data)
  if(data.status=="success"){
    window.location.href=data.session.url
  }
 
  }
  return (
    <div className="container w-[50%] mx-auto my-30 bg-gray-100 rounded-md p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePayment)}>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Details" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Phone" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="City" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className="text-white bg-green-700 py-3 my-3 rounded-md w-full"
            type="submit"
          >
          Send
          </button>
        </form>
      </Form>
    </div>
  );
}
