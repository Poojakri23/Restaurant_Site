import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1 className="hero-title">

          🍔  Savor the Flavors of 🍔  SpicyNest!
                          🍹  </h1>
           <p className="hero-subtitle">
          🔥 Dive into a world of taste, tradition & tantalizing dishes. <br /> 
          🥗 Fresh Ingredients · 🍛 Authentic Taste · 🍰 Sweet Endings
        </p>
        {/* <button className="hero-button">🍽️ Order Now</button> */}
      </div>
    </section>
  );
};

export default Hero;
