import React from 'react'
import CategorySlider from '../categorySlider/page';
import getAllCategories from '@/Api/getAllCategories';

export default async function AllCategories() {
        let data = await getAllCategories();
  return (
    <>
         <CategorySlider dataList={data}/>
    </>
  )
}
