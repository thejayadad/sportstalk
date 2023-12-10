'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import {signIn, signOut, useSession} from 'next-auth/react'


const AuthLinks = () => {
  const { data: session } = useSession();
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const { cart } = useCart();

  const openTooltip = () => setTooltipVisible(true);
  const closeTooltip = () => setTooltipVisible(false);
  console.log('Cart contents:', cart);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <div className="flex items-center space-x-4 cursor-pointer">
      <motion.div
        whileHover={{ scale: 1.3 }}
        transition={{ duration: 0.2 }}
      >
        <Link className="text-secondary" href={"/cart"}>
          <div className='flex relative flex-col'>
          {totalQuantity > 0 && (
                <span className='ml-4 text-sm absolute bottom-8 text-primary bg-pink p-2 rounded-sm'>
                  {totalQuantity}
                </span>           
            )}
          <FiShoppingCart size={36} />
          </div>
        </Link>
      </motion.div>
      <motion.div
        onMouseEnter={openTooltip}
        onMouseLeave={closeTooltip}
        className="relative"
      >
        <div className="flex space-x-4">
          <FiUser size={36} className="text-pink mr-4" />
        </div>
        <AnimatePresence>
          {isTooltipVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 mt-2 w-48 bg-white text-secondary shadow-lg overflow-hidden z-10"
            >
              <div className="px-4 py-2 flex flex-col">
                {session ? (
                  <>
                    {session.user.email} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                  </>
                ) : (
                  <button onClick={() => signIn()}>Sign in</button>
                )}
              </div>
              <div className="px-4 py-2 mt-2 border-t">
                <h3 className="text-lg font-semibold">Shopping Cart</h3>
                {cart.length > 0 ? (
                  <ul>
                    {cart.map((item) => (
                      <li key={item.id}>
                        {item.title} - ${item.prices[0]}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Your cart is empty</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthLinks;
