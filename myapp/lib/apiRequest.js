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
