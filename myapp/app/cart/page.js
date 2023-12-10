'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import CartItem from '@/components/client/CartItem/CartItem';

const Cart = () => {
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.prices[0] * item.quantity, 0);

  return (
    <motion.section
      className='px-4 py-8'
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5 }}
    >
      <div className='max-w-screen-xl mx-auto'>
        <h1 className='text-3xl font-semibold mb-4'>Shopping Cart</h1>
        {cart.length > 0 ? (
          <motion.table
            className='w-full border-collapse overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Product</th>
                <th className='py-2 px-4 border-b'>Description</th>
                <th className='py-2 px-4 border-b'>Side</th>
                <th className='py-2 px-4 border-b'>Price</th>
                <th className='py-2 px-4 border-b'>Quantity</th>
                <th className='py-2 px-4 border-b'>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </tbody>
          </motion.table>
        ) : (
          <p>Your cart is empty</p>
        )}

        {cart.length > 0 && (
          <motion.div
            className='mt-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className='text-xl font-semibold mb-2'>Total: ${total.toFixed(2)}</h2>
            <motion.button
              className='secondary text-secondary bg-transparent border border-pink py-2 px-4 '
              whileHover={{ scale: 1.05 }}
            >
              Checkout
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Cart;
