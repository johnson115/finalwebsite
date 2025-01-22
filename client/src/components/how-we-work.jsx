import { Rocket, Target, Users, Award } from 'lucide-react'
import '../styles/how-we-work.css';
import React from 'react';

 const WhoWeAre=React.forwardRef((props , ref) => {
  return (
    <section className="who-we-are">
      <div className="container">
        <div className="section-header">
          <h2>Unlock the Secrets of Digital Success</h2>
          <p>
          Step into a world where strategy meets innovation. Discover how we transform bold ideas into extraordinary results, making your digital future unstoppable.
          </p>
        </div>

        <div className="content-grid">
          <div className="content-column">
            <div className="info-card">
              <Rocket className="icon" alt=" Rocket icon symbolizing bold growth and cutting-edge transformation." />
              <h3>Our Mission</h3>
              <p>
              We exist to ignite growth and transformation. With razor-sharp strategies and a relentless focus on innovation, we help businesses rise above the noise."


              </p>
            </div>
            <div className="info-card">
              <Target className="icon" />
              <h3>Our Vision</h3>
              <p>
              We see a future where [digital innovation] rules. Our vision is to empower businesses to rise, thrive, and lead in a fast-evolving digital world
              </p>
            </div>
          </div>

          <div className="content-column offset">
            <div className="info-card">
              <Users className="icon" />
              <h3>Our Team</h3>
              <p>
              Our diverse team of digital experts knows the power of collaboration. Together, we craft solutions that leave a lasting impression and deliver undeniable value
              </p>
            </div>
            <div className="info-card">
              <Award className="icon" />
              <h3>Our Promise  </h3>
              <p>
              Our promise is simple: your success is our obsession. With [customized strategies] and [uncompromising commitment], we deliver results you can count on
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
})
export default WhoWeAre;

