import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    cart: [],
  };
  
  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
  
        if (existingProductIndex !== -1) {
          const updatedCart = [...state.cart];
          updatedCart[existingProductIndex].quantity += 1;
  
          return { ...state, cart: updatedCart };
        } else {
          return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        }
  
      default:
        return state;
    }
  };
  

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // Add more functions for other cart operations if needed

  return (
    <CartContext.Provider value={{ ...state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
