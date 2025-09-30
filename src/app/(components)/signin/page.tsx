"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schema/login.schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {toast} from "sonner"; 

export default function Login() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handlelogin(value: any) {
    const res = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false, 
    });

    if (res?.error) {
      toast.error("Invalid email or password!", { position: "top-center" }); 
    } else {
      toast.success("Login Successfully!", { position: "top-center" });
      router.push("/home"); 
    }
  }

  return (
    <div className="container w-[50%] mx-auto my-30 bg-gray-100 rounded-md p-10">
      <h1 className="text-4xl text-green-700 text-center  my-10">Login Now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlelogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className="text-white bg-green-700 py-3 my-3 rounded-md w-full"
            type="submit"
          >
            Login
          </button>
          <p
            onClick={() => router.push("/forgetpassword")}
            className="text-green-700 text-sm mt-2 cursor-pointer text-center"
          >
            Forget Password?
          </p>
        </form>
      </Form>
    </div>
  );
}
