import getAllCategories from '@/Api/getAllCategories'
import CategoriesList from '@/app/_components/categoryList/page'
import React from 'react'

export default async function Categories() {
  const dataList = await getAllCategories()

  return (
    <div className='container w-[90%] mx-auto my-10'>
      <CategoriesList categories={dataList} />
    </div>
  )
}
