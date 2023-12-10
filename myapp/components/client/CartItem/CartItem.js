'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/CartContext';

const CartItem = ({ item }) => {
  const { addToCart } = useCart();

  const handleIncreaseQuantity = () => {
    addToCart({ ...item, quantity: item.quantity + 1 });
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: item.quantity - 1 });
    }
  };

  return (
    <motion.tr
      className='border-b hover:bg-gray-100 transition duration-300'
      whileHover={{ scale: 1.02 }}
    >
      <td className='py-2 px-4 border-r'>
        <img src={item.img} alt={item.title} className='w-16 h-16 object-cover' />
      </td>
      <td className='py-2 px-4 border-r'>
        <div>
          <h3 className='font-semibold'>{item.title}</h3>
          <p className='text-gray-500'>{item.desc}</p>
        </div>
      </td>
      <td className='py-2 px-4 border-r'>{item.side}</td>
      <td className='py-2 px-4 border-r'>${item.prices[0]}</td>
      <td className='py-2 px-4 border-r'>
        <div className='flex items-center'>
          <button
            className='text-pink focus:outline-none'
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
          <span className='mx-2'>{item.quantity}</span>
          <button
            className='text-secondary focus:outline-none'
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        </div>
      </td>
      <td className='py-2 px-4'>
        <strong>${(item.prices[0] * item.quantity).toFixed(2)}</strong>
      </td>
    </motion.tr>
  );
};

export default CartItem;
