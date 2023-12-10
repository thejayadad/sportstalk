'use client'
// ProductList.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Modal from '@/components/modals/Modal';
import { fetchProducts } from '@/lib/apiRequest';
import { motion } from 'framer-motion';
import ProductText from './ProductText';
import Logo from '@/components/Logo/Logo';
import { useCart } from '@/lib/CartContext';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSide, setSelectedSide] = useState(null);

  const { addToCart } = useCart();


  const handleSideSelect = (side) => {
    setSelectedSide(side);
  };

  const handleAddToCart = () => {
    const productWithQuantity = { ...selectedProduct, quantity: 1, side: selectedSide };
    addToCart(productWithQuantity);
    handleCloseModal();
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error setting products:', error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className='max-w-screen-xl mx-auto px-4 py-8 cursor-pointer'>
      <ProductText />
      <div className={`grid grid-cols-2 items-center md:grid-cols-3 gap-4 ${selectedProduct ? 'opacity-50 pointer-events-none' : ''}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
        ))}
      </div>

      {selectedProduct && (
        <Modal isOpen={selectedProduct !== null} onClose={handleCloseModal}>
          <div className='text-center mx-auto w-full flex items-center'>
          <Logo className='text-center' size={'150px'} />
          </div>
          <img 
            src={selectedProduct.img}
            alt={selectedProduct.title}
            className='w-full h-64 object-cover mb-4'
          />
          <h2 className='text-xl font-semibold mb-2'>{selectedProduct.title}</h2>
          <p className='text-gray-500 mb-4'>{selectedProduct.desc}</p>
          <p className='text-blue-500 font-semibold'>
            <span className='text-pink'>$</span>
            {selectedProduct.prices[0]}
            
          </p>

   <div className='mt-4 flex items-center '>
          <p className='text-lg font-semibold mr-2'>Select a Side:</p>
          {selectedProduct.sides.map((side) => (
              <div>
            <motion.div
              key={side.text}
              className='mr-2'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type='radio'
                id={side.text}
                name='side'
                value={side.text}
                checked={selectedSide === side.text}
                onChange={() => handleSideSelect(side.text)}
              />
              <label htmlFor={side.text} className='ml-1'>
                {side.text} - ${side.price}
              </label>
            </motion.div>
              </div>
          ))}
        </div>

        {selectedSide && (
          <motion.button
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md'
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
          >
            Add to Cart
          </motion.button>
        )}
        </Modal>
      )}
    </section>
  );
};

export default ProductList;
