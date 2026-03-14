import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 'var(--nav-height)',
      backgroundColor: 'var(--bg-color)',
      borderBottom: '1px solid var(--border-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 100
    }}>
      
      <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
        <Link to="/" style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>SHOP</Link>
        <Link to="/about" style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>OUR STORY</Link>
        <a href="https://bawal-admin-git-main-bamraradevansh-7503s-projects.vercel.app/" target="_blank" rel="noreferrer" style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--text-muted)' }}>ADMIN</a>
      </div>

      <div style={{ flex: 1, textAlign: 'center' }}>
        <Link to="/" className="logo-brand">BAWAL<sup>TM</sup></Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
        <button 
          onClick={() => setIsCartOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900 }}
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span style={{
              background: 'var(--accent-neon)',
              color: '#000',
              padding: '2px 8px',
              borderRadius: '99px',
              fontSize: '0.85rem'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
      
    </nav>
  );
};

export default Navbar;
