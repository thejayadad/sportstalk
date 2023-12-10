// apiRequest.js
const apiUrl = 'http://localhost:3000/api/';

const fetchProducts = async () => {
  try {
    const response = await fetch(`${apiUrl}product`); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

export { fetchProducts };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_URL}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error('Failed to create order');
    }

    const order = await res.json();
    return order;
  } catch (error) {
    console.error('Error creating order:', error.message);
    throw error;
  }
};