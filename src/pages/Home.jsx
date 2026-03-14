import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getAvailable()
      .then(data => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="editorial-container">
      
      {/* 
        THE EDITORIAL GRID 
        A massive, asymmetrical CSS grid that acts like a magazine collage.
      */}
      <div className="editorial-grid">
        
        {/* HUGE HERO BLOCK */}
        <div className="grid-block col-span-4 row-span-2" style={{ backgroundColor: '#111', color: 'var(--accent-neon)' }}>
          <div style={{ padding: '40px', zIndex: 2, position: 'relative' }}>
            <div className="section-label" style={{ display: 'inline-block', borderColor: 'var(--accent-neon)', color: '#fff' }}>DROP 01</div>
            <h1 className="mega-text" style={{ marginTop: '24px' }}>STREET<br/>CULTURE<br/>DOMINANCE.</h1>
            <p style={{ marginTop: '24px', fontSize: '1.25rem', maxWidth: '400px', color: '#fff' }}>
              Oversized fits. Heavyweight cotton. Meme graphics. We are the new Nukkad.
            </p>
          </div>
        </div>

        {/* SUB-HERO */}
        <div className="grid-block col-span-2 row-span-1" style={{ backgroundColor: 'var(--accent-neon)' }}>
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <h2 style={{ fontSize: '3rem', lineHeight: 0.9 }}>FEEL YOUNG,<br/>BE UNSTOPPABLE.</h2>
          </div>
        </div>

        {/* STATIC IMAGE TILE */}
        <div className="grid-block col-span-2 row-span-1" style={{ backgroundColor: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
           <h2 style={{ fontSize: '5rem', opacity: 0.1, position: 'absolute' }}>BAWAL</h2>
           <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>NEW ARRIVALS DOWN BELOW ↓</div>
        </div>

        {/* PRODUCT CATALOG INJECTION */}
        {loading ? (
          <div className="grid-block col-span-4" style={{ padding: '60px', textAlign: 'center' }}>
            <h2 className="mega-text">LOADING...</h2>
          </div>
        ) : products.length === 0 ? (
          <div className="grid-block col-span-4" style={{ padding: '60px', textAlign: 'center' }}>
            <h2>New drop coming soon. Keep your eyes peeled.</h2>
          </div>
        ) : (
          products.map((product, idx) => {
            // Alternate sizes to keep the grid asymmetrical
            const isLargeBlock = idx % 5 === 0;
            const colClass = isLargeBlock ? 'col-span-2' : 'col-span-1';
            const rowClass = isLargeBlock ? 'row-span-2' : 'row-span-1';

            return (
              <Link to={`/product/${product.id}`} className={`grid-block product-card ${colClass} ${rowClass}`} key={product.id}>
                
                <div className="product-image-wrap">
                  {product.images?.[0] ? (
                    <img src={product.images[0].imageUrl} alt={product.name} />
                  ) : (
                    <div style={{ fontSize: '2rem', fontWeight: 900, opacity: 0.2 }}>NO IMG</div>
                  )}
                  {isLargeBlock && (
                     <div style={{ position: 'absolute', top: 24, left: 24, padding: '8px 16px', background: 'var(--accent-neon)', fontWeight: 900, fontSize: '0.85rem' }}>
                       FEATURED
                     </div>
                  )}
                </div>

                <div className="product-info">
                  <div style={{ paddingRight: '16px' }}>
                    <h3 style={{ fontSize: isLargeBlock ? '1.5rem' : '1.1rem', marginBottom: '8px' }}>{product.name}</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {product.variants?.map(v => (
                        <span key={v.id} style={{ fontSize: '0.75rem', fontWeight: 700, color: v.stock === 0 ? '#ccc' : 'inherit' }}>
                          {v.size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontWeight: 900, fontSize: isLargeBlock ? '1.5rem' : '1.25rem' }}>
                    ₹{product.price}
                  </div>
                </div>

              </Link>
            )
          })
        )}

      </div>
    </div>
  );
};

export default Home;
