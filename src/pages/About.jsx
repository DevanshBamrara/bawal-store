import React from 'react';

const About = () => {
  return (
    <div style={{ paddingTop: 'calc(var(--nav-height))', minHeight: '100vh', backgroundColor: '#111', color: '#fff' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        
        {/* Massive Header */}
        <h1 className="mega-text" style={{ color: 'var(--accent-neon)', mixBlendMode: 'normal' }}>
          FROM THE<br/>GULLY TO<br/>THE WORLD.
        </h1>

        <div className="responsive-grid-2" style={{ marginTop: '80px' }}>
          
          {/* Mission Statement */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>THE NEW NUKKAD.</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#aaa', marginBottom: '24px' }}>
              BAWAL isn't just clothing. It's the language of the streets, translated into heavyweight cotton. 
              We take the raw, unfiltered aesthetic of the local Nukkad—the memes, the slang, the energy—and 
              elevate it into premium, oversized streetwear.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#aaa' }}>
              Born from the culture of Mumbai and Gujarat, we're building a uniform for the unstoppable Gen-Z.
              No fast fashion. No boring drops. Just pure BAWAL.
            </p>
          </div>

          {/* Core Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            <div style={{ borderTop: '2px solid var(--accent-neon)', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>01 / OVERSIZED EVERYTHING</h3>
              <p style={{ color: '#aaa' }}>If it ain't dropping past your shoulders, it ain't it. Our fits are meticulously engineered for the perfect drape.</p>
            </div>

            <div style={{ borderTop: '2px solid var(--accent-neon)', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>02 / UNFILTERED GRAPHICS</h3>
              <p style={{ color: '#aaa' }}>Meme culture in physical form. High-density prints that don't fade after one wash.</p>
            </div>

            <div style={{ borderTop: '2px solid var(--accent-neon)', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>03 / LIMITED DROPS</h3>
              <p style={{ color: '#aaa' }}>When it's gone, it's gone. We don't restock. You either cop it, or you miss out.</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;
