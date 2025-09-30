'use client'

import React, { useState } from 'react'
import CategoryDetails from '../categoryCart/page'
import { Icategory } from '@/app/interface/category.interface'
import { ISubcategory } from '@/app/interface/subcategory.interface'


export default function CategoriesList({ categories }: { categories: Icategory[] }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([])
  const [loading, setLoading] = useState(false)

  const handleCategoryClick = async (categoryId: string) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null)
      setSubcategories([])
      return
    }

    try {
      setLoading(true)
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      )
      const result = await response.json()
      setSelectedCategoryId(categoryId)
      setSubcategories(result.data)
    } catch (error) {
      console.error("Error while fetching subcategories:", error)
      setSelectedCategoryId(null)
      setSubcategories([])
    } finally {
      setLoading(false)
    }
  }

  const selectedCategory = categories.find(cat => cat._id === selectedCategoryId)

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}


      <div className='flex flex-wrap'>
        {categories.map((category) => (
          <CategoryDetails
            key={category._id}
            category={category}
            onClick={handleCategoryClick}
            isSelected={selectedCategoryId === category._id}
          />
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8 border-t pt-6">
          <h4 className="text-lg font-semibold text-green-700 mb-4 text-center">
            {selectedCategory.name} subcategories
          </h4>

          {subcategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {subcategories.map((subcat) => (
                <div
                  key={subcat._id}
                  className="border rounded-lg shadow-sm p-4 text-center font-medium text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  {subcat.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {selectedCategory.name}
            </p>
          )}
        </div>
      )}
    </>
  )
}
