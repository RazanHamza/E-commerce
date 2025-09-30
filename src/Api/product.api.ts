export  default async function getAllProducts(){
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    let {data}=await response.json();
   return  data;

}