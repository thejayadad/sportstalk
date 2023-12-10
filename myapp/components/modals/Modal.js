'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children }) => {
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center'
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={modalVariants}
        >
          <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
          <motion.div
            className='z-10 bg-white p-8 rounded-lg'
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <button className='absolute top-4 right-4 text-xl' onClick={onClose}>
              &times;
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
