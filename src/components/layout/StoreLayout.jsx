import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CartSlideout from '../cart/CartSlideout';

const StoreLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Outlet renders the matched route component */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <CartSlideout />

      <footer style={{ 
        padding: '60px 24px', 
        borderTop: '1px solid var(--border-dark)', 
        backgroundColor: '#000', 
        color: '#fff',
        marginTop: 'auto'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
             <h2 className="logo-brand" style={{ color: 'var(--accent-neon)' }}>BAWAL<sup>TM</sup></h2>
             <p style={{ marginTop: '16px', color: '#888', maxWidth: '400px' }}>
               Meme apparel and oversized streetwear for the culture. From the gully to the world.
             </p>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 700, textTransform: 'uppercase' }}>
            <a href="https://bawal-admin-git-main-bamraradevansh-7503s-projects.vercel.app/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-neon)' }}>Admin Panel</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Returns</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
