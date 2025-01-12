import '../styles/hero-section.css'

export default function HeroSection() {
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
        <h2 className="hero-tagline">The Future of Success, is Digital</h2>
        <p className="hero-citation">
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat praesentium quia, itaque earum magni quos! Officia, maiores libero molestias ut autem, assumenda odio voluptatum asperiores iure nostrum, incidunt eligendi pariatur? "
        </p>
        <div className="hero-buttons">
          <button className="hero-button">Our Services</button>
          <button className="hero-button">Contact us</button>
        </div>
      </div>
    </div>
  )
}

