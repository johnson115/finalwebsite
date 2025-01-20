import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import '../styles/navbar.css'
import Click from '../common/routes/click';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const add = async (type,on) => {
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

          <div className="navbar-menu-desktop">
            <div className="menu-items">
              <a href="/" className="menu-link active">Home</a>
              <a href="/" className="menu-link" onClick={()=>{add("Click" , "About Click")}}>About</a>
              <a href="/" className="menu-link" onClick={()=>{add("Click" , "Service Click")}}>Service</a>
              <a href="/" className="menu-link" onClick={()=>{add("Click" , "Project Click")}}>Project</a>
              <a href="/" className="menu-link">Pages +</a>
              <a href="/" className="menu-link" onClick={()=>{add("Click" , "Contact Click")}}>Contact</a>
            </div>
          </div>

   
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
          <a href="/" className="mobile-menu-link active">Home</a>
          <a href="/" className="mobile-menu-link">About</a>
          <a href="/" className="mobile-menu-link">Service</a>
          <a href="/" className="mobile-menu-link">Project</a>
          <a href="/" className="mobile-menu-link">Pages +</a>
          <a href="/" className="mobile-menu-link">Contact</a>
        </div>
      </div>
    </nav>
  )
}
