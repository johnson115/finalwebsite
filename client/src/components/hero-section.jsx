import '../styles/hero-section.css';
import React from 'react';

 const HeroSection=React.forwardRef((props , ref) =>{
  return (
    <div className="hero-section">
      <div className="hero-background">
        <img 
          src={require("../media/Element graphique DGM_Plan de travail 1 copie 4.png")} 
          alt="" 
          className="hero-bg-image"
        />
      </div>
      <div className="hero-content">
        <div className="hero-logo">
          <img
            src={require("../media/Logo DG move up_Plan de travail 1 copie 11.png")}
            alt="Digital Move Platform"
            className="hero-image"
          />
        </div>
        <h2 className="hero-tagline">The Future of Business is Digital.</h2>
        <p className="hero-citation">
          " Digital Move Up specializes in innovative marketing and IT solutions, from SEO to email marketing, empowering businesses to thrive in a digital-first world "
        </p>
        <div className="hero-buttons">
          <button className="hero-button">Discover Our Solutions</button>
          <button className="hero-button">Contact Us Today</button>
        </div>
      </div>
    </div>
  )
})
export default HeroSection;

