'use client'

import React from 'react'
import { Icategory } from '@/app/interface/category.interface'

export default function CategoryDetails({
  category,
  onClick,
  isSelected,
}: {
  category: Icategory
  onClick: (id: string) => void
  isSelected: boolean
}) {
  return (
    <div className='lg:w-[33%] sm:w-[50%] cursor-pointer'>
      <div
        onClick={() => onClick(category._id)}
        className={`border overflow-hidden m-5 rounded-md hover:border-green-700 hover:shadow-sm hover:shadow-green-700 border-gray-300 ${
          isSelected ? 'border-green-700 shadow-green-700 shadow-md' : ''
        }`}
      >
        <img src={category.image} className='w-[415px] h-[300px]' alt={category.name} />
        <h3 className='text-xl font-bold text-center py-2'>{category.name}</h3>
      </div>
    </div>
  )
}
