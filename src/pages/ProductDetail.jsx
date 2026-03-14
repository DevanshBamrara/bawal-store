import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    productsApi.getById(id)
      .then(data => setProduct(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: '40px' }}><h1 className="mega-text">LOADING...</h1></div>;
  if (!product) return <div style={{ padding: '40px' }}><h2>Product not found.</h2></div>;

  const handleAddToCart = () => {
    if (!selectedSize) return alert('Select a size first!');
    
    const variant = product.variants.find(v => v.size === selectedSize);
    if (!variant || variant.stock === 0) return alert('Out of stock!');

    addToCart(product, variant, 1);
  };

  return (
    <div className="split-layout">
      
      {/* LEFT: Massive Image Scroller */}
      <div style={{ backgroundColor: '#f0f0f0' }}>
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '100px', left: '24px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, textTransform: 'uppercase' }}>
          <ArrowLeft size={20} /> BACK TO GRID
        </button>

        {product.images?.length > 0 ? (
          product.images.map(img => (
            <img key={img.id} src={img.imageUrl} alt={product.name} style={{ width: '100%', display: 'block', borderBottom: '1px solid var(--border-dark)' }} />
          ))
        ) : (
          <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 900, opacity: 0.2 }}>
            NO IMAGES AVAILABLE
          </div>
        )}
      </div>

      {/* RIGHT: Sticky Details Panel */}
      <div className="sticky-panel">
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', lineHeight: 0.9, marginBottom: '16px' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '1.5rem', fontWeight: 900 }}>₹{product.price}</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            {product.description}
          </p>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>SIZE</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>SIZE GUIDE</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '24px' }}>
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => {
              const variant = product.variants?.find(v => v.size === size);
              const isAvailable = variant && variant.stock > 0;
              const isSelected = selectedSize === size;

              return (
                <button 
                  key={size}
                  disabled={!isAvailable}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '16px 0',
                    border: '1px solid var(--border-dark)',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    background: isSelected ? '#000' : 'transparent',
                    color: isSelected ? 'var(--accent-neon)' : (isAvailable ? '#000' : '#ccc'),
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    opacity: isAvailable ? 1 : 0.5,
                    transition: 'all 0.2s'
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <button 
            onClick={handleAddToCart}
            className="bawal-btn" 
            style={{ 
              height: '80px', 
              fontSize: '1.5rem', 
              opacity: selectedSize ? 1 : 0.5 
            }}
          >
            {selectedSize ? 'ADD TO BAG' : 'SELECT A SIZE'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
