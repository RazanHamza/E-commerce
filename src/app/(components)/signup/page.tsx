"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Form } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from '@/app/schema/register.schema';
import axios from 'axios';
import { Tvalue } from '@/app/interface/value.interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Signup() {
    let router = useRouter();
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""

        },
        resolver: zodResolver(registerSchema),
    })

    async function handleRegister(value: Tvalue) {
        console.log(value)
        try {
            let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value);
            console.log(response);
            if (response.data.message == 'success') {
                toast.success('Register Successfully....!',{position:'top-center',duration:3000})
                router.push('/signin');

                setTimeout(() => {
                    form.reset();
                }, 0);
            }

        }
        catch (err: any) {
            console.log(err.response.data.message)
                 toast.error(err.response.data.message,{position:'top-center',duration:3000})
        }
 setTimeout(() => {
                    form.reset();
                }, 0);
    }


    console.log(form)


    return (
        <div className='container w-[50%] mx-auto my-30 bg-gray-100 rounded-md p-10'>
            <h1 className='text-4xl text-green-700 text-center  my-10'>Register Now</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegister)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" type='email' {...field} />
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
                                    <Input placeholder="Password" type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm Password" type='password' {...field} />
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
                                    <Input placeholder="Phone" type='tel' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button className='text-white bg-green-700 py-3 my-3 rounded-md w-full'>Register</button>
                </form>

            </Form>

        </div>
    );
}


