import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // item shape: { product, variant, quantity }
  const addToCart = (product, variant, quantity = 1) => {
    setCartItems(prev => {
      // Check if this specific variant is already in cart
      const existing = prev.find(item => item.variant.id === variant.id);
      if (existing) {
        return prev.map(item => 
          item.variant.id === variant.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, variant, quantity }];
    });
    setIsCartOpen(true); // Auto-open cart on add
  };

  const removeFromCart = (variantId) => {
    setCartItems(prev => prev.filter(item => item.variant.id !== variantId));
  };

  const updateQuantity = (variantId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.variant.id === variantId) {
        const newQty = Math.max(1, item.quantity + delta);
        if (newQty > item.variant.stock) {
          alert(`Only ${item.variant.stock} left in stock.`);
          return item; // prevent adding more than stock
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      isCartOpen, 
      setIsCartOpen,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
