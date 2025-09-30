"use client"
import getMyToken from "@/utilities/getMyToken";


export async function getloggedUserCart(){
    const token =await getMyToken();
    const headers:any={
        token:token,
        "content-type":"application/json"
    }

        let res=await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        })
        let data=await res.json();
        return data;
    }