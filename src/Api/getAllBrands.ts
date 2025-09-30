export const getAllBrands = async () => {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  return await response.json();
};
