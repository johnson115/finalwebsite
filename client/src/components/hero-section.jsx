import Click from "../common/routes/click";
import "../styles/hero-section.css";
import React, { useEffect } from "react";

const HeroSection = React.forwardRef((props, ref) => {
  const add = async (type, on) => {
    try {
      await Click("/add", {
        type: type,
        on: on,
        nb: 1,
      });

      console.log("Click added successfully.");
    } catch (error) {
      console.error("Error adding visit:", error.message);
    }
  };

  useEffect(() => {
    add("view", "Main Page View");
  }, []);

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
          " Digital Move Up specializes in innovative marketing and IT
          solutions, from SEO to email marketing, empowering businesses to
          thrive in a digital-first world "
        </p>
        <div className="hero-buttons">
          <a href="#services">
            <button
              onClick={(e) => {
                add("Click", "Service Click");
              }}
              className="hero-button"
            >
              Discover Our Solutions
            </button>
          </a>
          <a href="#contact">
            <button
              onClick={(e) => {
                add("Click", "Contact Click");
              }}
              className="hero-button"
            >
              Contact Us Today
            </button>
          </a>
        </div>
      </div>
    </div>
  );
});
export default HeroSection;
