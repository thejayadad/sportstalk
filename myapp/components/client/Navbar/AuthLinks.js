"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';


const AuthLinks = () => {
  const { data: session } = useSession();
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const openTooltip = () => setTooltipVisible(true);
  const closeTooltip = () => setTooltipVisible(false);
  return (
    
   <div className='flex items-center space-x-4 cursor-pointer'>
         
      <motion.div
    whileHover={{ scale: 1.3 }}
    transition={{ duration: 0.2 }}
  >
    <Link 
    className="text-secondary"
    href={'/cart'}>
    <FiShoppingCart size={36} />
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
        {
          isTooltipVisible && (
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
            </motion.div>
          )
        }

      </AnimatePresence>
        </motion.div>
    </div>
  
  )
}

export default AuthLinks

{/* <>
Signed in as {session.user.email} <br />
<button onClick={() => signOut()}>Sign out</button>
</>
)
}
return (
<>
Not signed in <br />
<button onClick={() => signIn()}>Sign in</button>
</> */}