import { Rocket, Target, Users, Award } from 'lucide-react'
import '../styles/how-we-work.css';

export default function WhoWeAre() {
  return (
    <section className="who-we-are">
      <div className="container">
        <div className="section-header">
          <h2>Who We Are</h2>
          <p>
            We are a dynamic digital agency committed to transforming businesses through innovative digital solutions and cutting-edge technology.
          </p>
        </div>

        <div className="content-grid">
          <div className="content-column">
            <div className="info-card">
              <Rocket className="icon" />
              <h3>Our Mission</h3>
              <p>
                To empower businesses with digital transformation strategies that drive growth and innovation in the modern digital landscape.
              </p>
            </div>
            <div className="info-card">
              <Target className="icon" />
              <h3>Our Vision</h3>
              <p>
                To be the leading catalyst for digital excellence, setting new standards in technological innovation and digital success.
              </p>
            </div>
          </div>

          <div className="content-column offset">
            <div className="info-card">
              <Users className="icon" />
              <h3>Our Team</h3>
              <p>
                A diverse group of passionate experts dedicated to delivering exceptional digital solutions and memorable client experiences.
              </p>
            </div>
            <div className="info-card">
              <Award className="icon" />
              <h3>Our Excellence</h3>
              <p>
                We pride ourselves on delivering high-quality solutions that exceed expectations and drive measurable results.
              </p>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">200+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">150+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">50+</span>
            <span className="stat-label">Team Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">10+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  )
}

