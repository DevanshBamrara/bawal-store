import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartSlideout = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999
        }}
        onClick={() => setIsCartOpen(false)}
      />

      <div style={{
        position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100vh',
        backgroundColor: '#fff', zIndex: 1000, display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid var(--border-dark)', animation: 'slideIn 0.3s ease-out forwards'
      }}>
        
        <style>{`
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `}</style>

        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem' }}>YOUR BAG</h2>
          <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
              Your bag is empty.
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.variant.id} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '80px', height: '100px', backgroundColor: '#f5f5f5' }}>
                  {item.product.images?.[0] && (
                    <img src={item.product.images[0].imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.product.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Size: {item.variant.size}</p>
                    <p style={{ fontWeight: 900, marginTop: '4px' }}>₹{item.product.price}</p>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-dark)' }}>
                      <button onClick={() => updateQuantity(item.variant.id, -1)} style={{ padding: '4px 12px', fontWeight: 900 }}>-</button>
                      <span style={{ padding: '4px 12px', fontWeight: 900, borderLeft: '1px solid var(--border-dark)', borderRight: '1px solid var(--border-dark)' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.variant.id, 1)} style={{ padding: '4px 12px', fontWeight: 900 }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.variant.id)} style={{ fontSize: '0.75rem', textDecoration: 'underline', color: 'var(--text-muted)' }}>
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--border-dark)', backgroundColor: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.25rem', fontWeight: 900 }}>
              <span>SUBTOTAL</span>
              <span>₹{cartTotal}</span>
            </div>
            
            <button 
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
              className="bawal-btn"
            >
              CHECKOUT <ArrowRight style={{ marginLeft: '12px' }} />
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default CartSlideout;
