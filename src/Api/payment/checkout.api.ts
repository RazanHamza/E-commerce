"use server"
import { ICheckout } from "@/app/interface/address.interface";
import getMyToken from "@/utilities/getMyToken";

 export async function onlinePayment(formValues:ICheckout,cartId:string){
const token:any=await getMyToken();
const res=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,{
    method:"POST",
    headers:
    {
        token,
        "content-type":"application/json"
    },
    body:JSON.stringify({shippingAddress:formValues})
}
)
const payload=await res.json();
return payload

}