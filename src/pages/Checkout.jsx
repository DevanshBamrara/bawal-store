import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ordersApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
        <h1 className="mega-text" style={{ color: 'var(--accent-neon)', textShadow: '2px 2px 0 #000' }}>SECURED.</h1>
        <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '24px 0' }}>Your drop is confirmed.</p>
        <button className="bawal-btn" onClick={() => navigate('/')} style={{ maxWidth: '300px' }}>
          BACK TO STREET
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Cart is empty. Go cop some drops.</h2>
        <button className="bawal-btn outline" onClick={() => navigate('/')} style={{ marginTop: '24px', maxWidth: '300px' }}>HOME</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderPayload = {
        ...formData,
        items: cartItems.map(item => ({
          variantId: item.variant.id,
          quantity: item.quantity
        }))
      };

      await ordersApi.create(orderPayload);
      clearCart();
      setSuccess(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'calc(var(--nav-height) + 40px) 24px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
      
      {/* Left side: Checkout Form */}
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>CHECKOUT</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 900, marginBottom: '8px' }}>FULL NAME</label>
            <input required style={{ width: '100%', padding: '16px', border: '2px solid #000', fontSize: '1rem', outline: 'none' }}
                   value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: 900, marginBottom: '8px' }}>EMAIL</label>
            <input required type="email" style={{ width: '100%', padding: '16px', border: '2px solid #000', fontSize: '1rem', outline: 'none' }}
                   value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 900, marginBottom: '8px' }}>PHONE</label>
            <input required type="tel" style={{ width: '100%', padding: '16px', border: '2px solid #000', fontSize: '1rem', outline: 'none' }}
                   value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 900, marginBottom: '8px' }}>SHIPPING ADDRESS</label>
            <textarea required style={{ width: '100%', padding: '16px', border: '2px solid #000', fontSize: '1rem', outline: 'none', minHeight: '120px' }}
                      value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="bawal-btn" style={{ marginTop: '24px' }}>
            {loading ? 'PROCESSING...' : `PAY ₹${cartTotal}`}
          </button>
        </form>
      </div>

      {/* Right side: Order Summary */}
      <div style={{ backgroundColor: '#fafafa', padding: '40px', border: '1px solid var(--border-dark)', height: 'fit-content' }}>
        <h2 style={{ marginBottom: '32px' }}>SUMMARY</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px', borderBottom: '1px solid var(--border-dark)', paddingBottom: '32px' }}>
          {cartItems.map(item => (
            <div key={item.variant.id} style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '80px', height: '100px', backgroundColor: '#e5e5e5' }}>
                {item.product.images?.[0] && <img src={item.product.images[0].imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover'}} />}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem' }}>{item.product.name}</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{item.variant.size} x {item.quantity}</p>
                </div>
                <div style={{ fontWeight: 900 }}>₹{item.product.price * item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900 }}>
          <span>TOTAL</span>
          <span>₹{cartTotal}</span>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
