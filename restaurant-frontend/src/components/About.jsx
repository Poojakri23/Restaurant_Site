import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
            alt="Restaurant Interior"
          />
        </div>
        <div className="about-content">
          <h2>About 🍹SpicyNest🔥</h2>
          <p>
            Welcome to Spicynest – your ultimate food destination! We bring the finest
            traditional and contemporary flavors together in one place. Whether you're
            craving a classic Indian thali or a spicy fusion twist, we’ve got you covered.
          </p>
          <p>
            With fresh ingredients and passionate chefs, our restaurant offers a warm
            ambiance and an unforgettable taste experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
