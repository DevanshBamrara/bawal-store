const API_URL = import.meta.env.VITE_API_URL || 'https://bawal-api.onrender.com/api';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'API Error');
  }
  return data.data;
};

export const productsApi = {
  // Only fetching active products for the storefront
  getAvailable: () => fetch(`${API_URL}/products`).then(handleResponse),
  getById: (id) => fetch(`${API_URL}/products/${id}`).then(handleResponse),
};

export const ordersApi = {
  create: (orderData) => fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  }).then(handleResponse),
};
