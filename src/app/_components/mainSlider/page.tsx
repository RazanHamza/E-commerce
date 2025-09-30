"use client"
import React from 'react'
import Img1 from '../../../../public/images/slider-image-1.jpeg'
import Img2 from '../../../../public/images/slider-image-2.jpeg'
import Img3 from '../../../../public/images/slider-image-3.jpeg'
import Img4 from '../../../../public/images/grocery-banner-2.jpeg'
import Img5 from '../../../../public/images/grocery-banner.png'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import  {Autoplay} from 'swiper/modules';
export default function MainSlider() {
  return (
    <>
    <div className='w-[90%] mx-auto my-10'  >
         <div className='flex flex-wrap'>
        <div className='w-3/4'>
         <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{delay:1000}}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide> <Image src={Img1} alt="img1" className='h-[400px] w-full'/></SwiperSlide>
      <SwiperSlide> <Image src={Img2} alt="img2" className='h-[400px] w-full'/></SwiperSlide>
      <SwiperSlide> <Image src={Img3} alt="img3" className='h-[400px] w-full'/></SwiperSlide>
    </Swiper>
        </div>
        <div className='w-1/4'>
        <Image src={Img4} alt="img4" className='h-[200px]'/>
        <Image src={Img5} alt="img5" className='h-[200px]'/>
        </div>
     </div>
    </div>
    
    </>
  )
}
