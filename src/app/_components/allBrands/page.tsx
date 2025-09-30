"use client";
import React, { useState, useEffect } from "react";
import { IBrand } from "@/app/interface/brand.interface";
import { getAllBrands } from "@/Api/getAllBrands";

export default function Brands() {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const result = await getAllBrands();
        setBrands(result.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
      setLoading(false);
    };
    fetchBrands();
  }, []);

  const openBrand = (brand: IBrand) => {
    setSelectedBrand(brand);
  };

  const closeModal = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border rounded-lg shadow-sm p-4 text-center cursor-pointer hover:bg-gray-100"
            onClick={() => openBrand(brand)}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="mx-auto mb-2 h-24 object-contain"
            />
            <p className="font-medium">{brand.name}</p>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg relative max-w-md w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <i className="fa-solid fa-xmark text-black"></i>
            </button>
            <h3 className="text-2xl font-semibold text-center mb-4">
              {selectedBrand.name}
            </h3>
            <img
              src={selectedBrand.image}
              alt={selectedBrand.name}
              className="w-full h-48 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
