"use client"
import getMyToken from "@/utilities/getMyToken";


export async function getloggedUserWhishList(){
    const token =await getMyToken();
    const headers:any={
        token:token,
        "content-type":"application/json"
    }

        let res=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:headers
        })
        let data=await res.json();
        return data;
        
    }