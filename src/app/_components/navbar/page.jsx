"use client"
import { cartItemContext } from '@/app/context/cartItemContext';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext } from 'react';

const Navbar = () => {
  let { data: session } = useSession();
  const { dataDetails } = useContext(cartItemContext);

  function logOut() {
    signOut({ callbackUrl: '/signin' });
  }

  return (
    <nav className='bg-gray-200 py-5'>
      <div className='container flex flex-wrap gap-4 justify-center lg:justify-between items-center w-[90%] mx-auto'>
        <div>
          <ul className='flex items-center lg:gap-6 gap-4'>
            <li className='text-2xl font-bold'>
              <i className="fa-solid fa-cart-shopping text-green-700"></i>
              <span>FreshCart</span>
            </li>
            <li><Link href="/home" className='hover:text-green-700 transition-colors duration-200'>Home</Link></li>
            <li><Link href="/products" className='hover:text-green-700 transition-colors duration-200'>Product</Link></li>
            <li><Link href="/categories" className='hover:text-green-700 transition-colors duration-200'>Categories</Link></li>

            {session && (
              <>
                <li>
                  <Link href="/cart" className='relative inline-flex items-center p-3 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300'>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                      {dataDetails > 99 ? '99+' : dataDetails ?? 0}
                    </div>
                  </Link>
                </li>

                <li>
                  <Link href="/wishList" className='hover:text-green-700 transition-colors duration-200'>WishList</Link>
                </li>
              </>
            )}


            <li><Link href="/brands" className='hover:text-green-700 transition-colors duration-200'>Brands</Link></li>
          </ul>
        </div>
        <div>
          <ul className='flex flex-wrap items-center gap-4 lg:gap-6'>
            {session ? (
              <>
                <li><span onClick={logOut} className='hover:text-green-700 transition-colors duration-200 cursor-pointer'>Logout</span></li>
                <li className='text-green-700 hover:text-gray-800 transition-colors duration-200'>Hi {session?.user?.name} ...!</li>
              </>
            ) : (
              <>
                <li><Link href="/signin" className='hover:text-green-700 transition-colors duration-200'>Login</Link></li>
                <li><Link href="/signup" className='hover:text-green-700 transition-colors duration-200'>Registration</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
