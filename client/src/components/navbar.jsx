import React, { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import "../styles/navbar.css"
import '../styles/navbar.css'
import Click from '../common/routes/click';


export default function Navbar({ refs }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(refs)
      const currentSection = sections.find((section) => {
        const element = refs[section].current
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [refs])

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
            <a
              href="/"
              className="logo-container"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(refs.hero)
              }}
            >
              <img
                src={require("../media/Logo DG move up_Plan de travail 1 copie 11.png") || "/placeholder.svg"}
                alt="Digital Move Platform logo"
                className="logo-image"
              />
            </a>
          </div>

          <div className="navbar-menu-desktop">
            <div className="menu-items">

              <a
                href="#hero"
                className={`menu-link ${activeSection === "hero" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(refs.hero)
                }}
              >
                Home
              </a>
              <a
                href="#ourStory"
                className={`menu-link ${activeSection === "ourStory" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(refs.ourStory)
                  add("Click" , "About Click")
                }}
              >
                About
              </a>
              <a
                href="#services"
                className={`menu-link ${activeSection === "services" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(refs.services)
                  add("Click" , "Service Click")
                }}
              >
                Service
              </a>
              <a
                href="#portfolio"
                className={`menu-link ${activeSection === "portfolio" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(refs.portfolio)
                  add("Click" , "Project Click")
                }}
              >
                Project
              </a>
              <div className="dropdown-container">
                <button className="menu-link dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  Pages  <ChevronDown className="dropdown-icon" />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/blogs" className="dropdown-item">
                      Blogs
                    </a>
                  </div>
                )}
              </div>
              <a
                href="#contact"
                className={`menu-link ${activeSection === "contact" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(refs.contact)
                  add("Click" , "Contact Click")
                }}
              >
                Contact
              </a>

            </div>
          </div>

   
          <div className="navbar-mobile-button">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-button">
              
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
      <div className={`navbar-mobile ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-items">

          <a
            href="#hero"
            className={`mobile-menu-link ${activeSection === "hero" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(refs.hero)
            }}
          >
            Home
          </a>
          <a
            href="#ourStory"
            className={`mobile-menu-link ${activeSection === "ourStory" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(refs.ourStory)
            }}
          >
            About
          </a>
          <a
            href="#services"
            className={`mobile-menu-link ${activeSection === "services" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(refs.services)
            }}
          >
            Service
          </a>
          <a
            href="#portfolio"
            className={`mobile-menu-link ${activeSection === "portfolio" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(refs.portfolio)
            }}
          >
            Project
          </a>
          <div className="mobile-dropdown">
            <button className="mobile-menu-link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Pages <ChevronDown className="dropdown-icon" />
            </button>
            {isDropdownOpen && (
              <div className="mobile-dropdown-menu">
                <a href="/blogs" className="mobile-dropdown-item">
                  Blogs
                </a>
              </div>
            )}
          </div>
          <a
            href="#contact"
            className={`mobile-menu-link ${activeSection === "contact" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(refs.contact)
            }}
          >
            Contact
          </a>

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

