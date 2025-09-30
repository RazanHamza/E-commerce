"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Icategory } from '@/app/interface/category.interface';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function CategorySlider({ dataList }: any) {
  console.log(dataList)



  return (
    <>
    <div className=''>
        <Swiper 
        spaceBetween={0}
        slidesPerView={6}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {dataList.map((category: Icategory) => <SwiperSlide key={category._id}>
          <Image  width={1000} height={1000} src={category.image} alt={category.name} className='w-full h-[200px]'/>
          <p className='text-center text-green-700'>{category.name}</p>

        </SwiperSlide>)}

      </Swiper>
    </div>
    
    </>
  )
}
