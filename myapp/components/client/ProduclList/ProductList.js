'use client'
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Modal from '@/components/modals/Modal';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className='max-w-screen-xl mx-auto px-4 py-8 cursor-pointer'>
      {/* ... existing code ... */}
      <div className='grid grid-cols-2 items-center md:grid-cols-3 gap-4'>
        <ProductCard onClick={() => handleProductClick(product)} />
      </div>

      {/* Modal */}
      {selectedProduct && (
        <Modal isOpen={selectedProduct !== null} onClose={handleCloseModal}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className='w-full h-64 object-cover mb-4'
          />
          <h2 className='text-xl font-semibold mb-2'>{selectedProduct.title}</h2>
          <p className='text-gray-500 mb-4'>{selectedProduct.description}</p>
          <p className='text-blue-500 font-semibold'>
            <span className='text-pink'>$</span>
            {selectedProduct.price}
          </p>
        </Modal>
      )}
    </section>
  );
};

export default ProductList;
