'use client'
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Modal from '@/components/modals/Modal';


const ProductList = () => {

  return (
    <section className='max-w-screen-xl mx-auto px-4 py-8 cursor-pointer'>
      <div className='grid grid-cols-2 items-center md:grid-cols-3 gap-4'>
          <ProductCard  />
      
      </div>

   </section>
  );
};

export default ProductList;
