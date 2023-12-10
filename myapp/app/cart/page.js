'use client'
import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import CartItem from '@/components/client/CartItem/CartItem';
import { loadStripe } from '@stripe/stripe-js';
import { createOrder } from '@/lib/apiRequest';

const Cart = () => {
  const { cart } = useCart();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const total = cart.reduce((acc, item) => acc + item.prices[0] * item.quantity, 0);

  const handleCheckout = async () => {
    const lineItems = cart.map((product) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
          },
          unit_amount: product.prices[0] * 100, 
        },
        quantity: product.quantity,
      };
    });

    try {
      const res = await fetch('http://localhost:3000/api/checkout', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(lineItems),
      });

      const data = await res.json();

      const stripe = await stripePromise;

      await stripe.redirectToCheckout({ sessionId: data.id });
      createOrder({
        customer: customerInfo.customer,
        email: customerInfo.email, 
        address: customerInfo.address, 
        total: total,
        status: 0, 
        method: 0, 
      });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const [customerInfo, setCustomerInfo] = useState({
    customer: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  

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
        <form>
          <label>
            Customer Name:
            <input
              type="text"
              name="customer"
              value={customerInfo.customer}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
            />
          </label>
        </form>
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
              onClick={handleCheckout}
              disabled={cart.length === 0}
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
