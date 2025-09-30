import React from 'react'
import ProductDetails from '@/Api/productDetails.api'
import Addbtn from '@/app/_components/addbtn/page'

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const data = await ProductDetails(id)

  return (
    <div className='container w-[90%] mx-auto my-10'>
      <div className='flex flex-wrap'>
        <div className='w-1/4'>
          <img src={data?.imageCover} alt={data?.title || 'Product image'} />
        </div>
        <div className='w-3/4 px-5 flex flex-col justify-between'>
          <div>
            <h1 className='text-3xl font-semibold pb-4'>{data?.title || 'No Title'}</h1>
            <p className='text-gray-600'>{data?.description || 'No Description'}</p>
          </div>
          <div>
            <h3 className='text-green-700'>{data?.category?.name || 'No Category'}</h3>
            <div className='flex py-3 flex-wrap items-center justify-between'>
              <div>
                <span>{data?.price != null ? `${data.price} EGP` : 'No Price'}</span>
              </div>
              <div className='flex items-center'>
                <p>{data?.ratingsAverage ?? 'N/A'}</p>
                <i className='fas fa-star text-amber-300'></i>
              </div>
              <Addbtn id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
