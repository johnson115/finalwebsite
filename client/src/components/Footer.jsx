import { Facebook, Linkedin, Mail, MapPin, Phone, Instagram , PhoneIcon as WhatsApp } from 'lucide-react'
import "../styles/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Contact Information */}
          <div className="footer-section">
            <h3 className="footer-title">Contact & Post Information:</h3>
            <div className="contact-info">
              <a href="mailto:contact@digitalmove.com" className="contact-item">
                <Mail className="icon" />
                contact@digitalmoveup.com
              </a>
              <a href="tel:+1234567890" className="contact-item">
                <Phone className="icon" />
                +216 28 879 855
              </a>
              <div className="contact-item">
                <MapPin className="icon" />
                <address>
                  Digital Move Up Platform
                  <br />
                  7V8H+2GC, Zarzouna
                  <br />
                  
                </address>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="footer-section center-section">
            <div className="logo-container">
              {/* Replace with your actual logo */}
              <img
                src={require("../media/Logo DG move up_Plan de travail 1 copie 11.png") || "/placeholder.svg"}
                alt="Digital Move Platform"
                className="footer-logo"
              />
            </div>
            <h2 className="footer-heading">Ready For A Digital Transformation?</h2>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <nav className="footer-nav">
              <a href="#ourStory" className="footer-link">
                About Us
              </a>
              <a href="#services" className="footer-link">
                Services
              </a>
              <a href="#portfolio" className="footer-link">
                Portfolio
              </a>
              <a href="/blog" className="footer-link">
                Blog
              </a>
              <a href="#contact" className="footer-link">
                Contact
              </a>
              <a href="/privacy&policy" className="footer-link">
                Privacy Policy
              </a>
            </nav>
          </div>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <a href="https://wa.me/+21628879855" className="social-link" aria-label="WhatsApp">
            <WhatsApp />
          </a>
          <a href="https://www.instagram.com/dmoveup/" className="social-link" aria-label="Instagram">
            <Instagram />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61563253679919" className="social-link" aria-label="Facebook">
            <Facebook />
          </a>
          <a href="https://www.linkedin.com/company/digital-move-up-platform" className="social-link" aria-label="LinkedIn">
            <Linkedin />
          </a>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>© {new Date().getFullYear()} Digital Move Platform. All rights reserved. Empowering digital success.</p>
          <p className="developer-credit">
            Developed by <a href="https://amennoomen.com/" target="_blank" rel="noopener noreferrer">Amen Allah Naamen</a> &  <a href="https://www.hazemsaidani.tn/" target="_blank" rel="noopener noreferrer">Hazem Saidani</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

