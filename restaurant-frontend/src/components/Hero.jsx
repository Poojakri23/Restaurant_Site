import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Savor the Flavors</h1>
        <p className="hero-subtitle">Experience a Gastronomic Journey</p>
        <button className="hero-button">Order Now</button>
      </div>
    </section>
  );
};

export default Hero;
