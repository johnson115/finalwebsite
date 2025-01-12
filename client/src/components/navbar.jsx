import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import '../styles/navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          
          <div className="navbar-logo">
            <div className="logo-container">
              <img 
                src={require("../media/Logo DG move up_Plan de travail 1 copie 11.png")} 
                alt="Digital Move Platform" 
                className="logo-image"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu-desktop">
            <div className="menu-items">
              <a href="#" className="menu-link active">Home</a>
              <a href="#" className="menu-link">About</a>
              <a href="#" className="menu-link">Service</a>
              <a href="#" className="menu-link">Project</a>
              <a href="#" className="menu-link">Pages +</a>
              <a href="#" className="menu-link">Contact</a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="navbar-mobile-button">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="menu-icon" aria-hidden="true" />
              ) : (
                <Menu className="menu-icon" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-items">
          <a href="#" className="mobile-menu-link active">Home</a>
          <a href="#" className="mobile-menu-link">About</a>
          <a href="#" className="mobile-menu-link">Service</a>
          <a href="#" className="mobile-menu-link">Project</a>
          <a href="#" className="mobile-menu-link">Pages +</a>
          <a href="#" className="mobile-menu-link">Contact</a>
        </div>
      </div>
    </nav>
  )
}
