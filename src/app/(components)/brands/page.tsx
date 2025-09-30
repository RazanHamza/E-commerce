
import { getAllBrands } from '@/Api/getAllBrands'
import Brands from '@/app/_components/allBrands/page'
import React from 'react'

export default async function Brand() {
  const dataList = await getAllBrands()

  return (
    <div className='container w-[90%] mx-auto my-10'>
      <Brands/>
    </div>
  )
}
