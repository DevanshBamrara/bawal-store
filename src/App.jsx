import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import StoreLayout from './components/layout/StoreLayout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      {/* 
        Wrap the entire application in CartProvider 
        so the Cart Slideout can be accessed from any page.
      */}
      <CartProvider>
        <Routes>
          <Route path="/" element={<StoreLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </CartProvider>

    </BrowserRouter>
  );
}

export default App;
