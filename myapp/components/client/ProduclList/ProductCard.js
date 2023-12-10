'use client'
import React from 'react'

const ProductCard = () => {
  return (
    <div>
        <div className='relative'>
            <div className='p-4 relative z-10'>
                <img
                className="w-full h-80   object-cover mb-4"
                src="https://images.pexels.com/photos/940301/pexels-photo-940301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                />
            <div className='text-center'>
            <h2 className="text-lg font-semibold mb-1">Title</h2>
                    <p className="text-gray-500 mb-2">Description</p>
                    <p className="text-blue-500 font-semibold"><span className='text-pink'>$</span>Price</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard