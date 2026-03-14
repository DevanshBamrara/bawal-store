import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
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
        
        {/* Mobile Hamburger */}
        <div className="mobile-only" style={{ flex: 1, alignItems: 'center' }}>
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop Links */}
        <div className="desktop-only nav-links-container" style={{ flex: 1, gap: '24px' }}>
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

      {/* Fullscreen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#111',
          color: '#fff',
          zIndex: 9999,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
            <Link to="/" className="logo-brand" style={{ color: 'var(--accent-neon)' }} onClick={() => setIsMenuOpen(false)}>BAWAL<sup>TM</sup></Link>
            <button onClick={() => setIsMenuOpen(false)} style={{ color: '#fff' }}>
              <X size={32} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ borderBottom: '1px solid #333', paddingBottom: '20px' }}>SHOP</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ borderBottom: '1px solid #333', paddingBottom: '20px' }}>OUR STORY</Link>
            <a href="https://bawal-admin-git-main-bamraradevansh-7503s-projects.vercel.app/" target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--accent-neon)' }}>ADMIN PANEL</a>
          </div>

        </div>
      )}
    </>
  );
};

export default Navbar;
