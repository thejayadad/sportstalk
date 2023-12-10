'use client'

import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
  return (
    <div>
      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} onClick={onClick}>
        <div className='relative'>
          <div className='p-4 relative z-10'>
            <img className="w-full h-80 object-cover mb-4" src={product.img} alt={product.title} />
            <div className='text-center'>
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-500 mb-2">{product.desc}</p>
              <p className="text-blue-500 font-semibold">
                <span className='text-pink'>$</span>{product.prices[0]}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
