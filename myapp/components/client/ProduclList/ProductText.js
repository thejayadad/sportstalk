'use client'
import React from 'react'

const ProductText = () => {
  return (
    <div className='text-center mb-20'>
    <h1 className='sm:text-3xl text-2xl font-medium title-font text-primary mb-4'>
      Fresh Menu Items
    </h1>
    <p  className='text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-secondary'>
      See Our Current Menu Items
    </p>
    <div className="flex mt-6 justify-center">
      <div className="w-16 h-1 rounded-full bg-pink inline-flex"></div>
    </div>
    </div>
  )
}

export default ProductText