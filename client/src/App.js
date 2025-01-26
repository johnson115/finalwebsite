<<<<<<< HEAD
import React, { useRef } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import HeroSection from "./components/hero-section"
import HowWeWork from "./components/how-we-work"
import OurStory from "./components/ourstory"
import MeetOurTeam from "./components/team"
import Services from "./components/services"
import Portfolio from "./components/portfolio"
import Features from "./components/features"
import Testimonial from "./components/testimonials"
import CTA from "./components/cta"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import PrivacyPolicy from "./components/Privacy&policy"
import BlogPage from "./pages/Blogs"

function App() {
  const heroRef = useRef(null)
  const howWeWorkRef = useRef(null)
  const ourStoryRef = useRef(null)
  const teamRef = useRef(null)
  const servicesRef = useRef(null)
  const portfolioRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialRef = useRef(null)
  const ctaRef = useRef(null)
  const contactRef = useRef(null)

  const refs = {
    hero: heroRef,
    howWeWork: howWeWorkRef,
    ourStory: ourStoryRef,
    team: teamRef,
    services: servicesRef,
    portfolio: portfolioRef,
    features: featuresRef,
    testimonial: testimonialRef,
    cta: ctaRef,
    contact: contactRef,
  }

  return (
    <BrowserRouter>
      <Navbar refs={refs} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div ref={heroRef} id="hero">
                <HeroSection />
              </div>
              <div ref={howWeWorkRef} id="howWeWork">
                <HowWeWork />
              </div>
              <div ref={ourStoryRef} id="ourStory">
                <OurStory />
              </div>
              <div ref={teamRef} id="team">
                <MeetOurTeam />
              </div>
              <div ref={servicesRef} id="services">
                <Services />
              </div>
              <div ref={portfolioRef} id="portfolio">
                <Portfolio />
              </div>
              <div ref={featuresRef} id="features">
                <Features />
              </div>
              <div ref={testimonialRef} id="testimonial">
                <Testimonial />
              </div>
              <div ref={ctaRef} id="cta">
                <CTA />
              </div>
              <div ref={contactRef} id="contact">
                <Contact />
              </div>
            </>
          }
        />
        <Route path="/privacy&policy" element={<PrivacyPolicy/>}/>
        <Route path="/blogs" element={<BlogPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

=======
import { useEffect } from "react";
import CTA from "./components/cta";
import Features from "./components/features";
import HeroSection from "./components/hero-section";
import HowWeWork from "./components/how-we-work";
import Navbar from "./components/navbar";
import OurStory from "./components/ourstory";
import Portfolio from "./components/portfolio";
import Services from "./components/services";
import MeetOurTeam from "./components/team";
import Testimonial from "./components/testimonials";
import Click from "./common/routes/click";

function App() {
  useEffect(() => {
    const addVisit = async () => {
      try {
        await Click("/add", {
          type: "view",
          on: "Main Page View",
          nb: 1,
        });

        console.log("Visit added successfully.");
      } catch (error) {
        console.error("Error adding visit:", error.message);
      }
    };

    addVisit();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <HowWeWork />
      <OurStory />
      <MeetOurTeam />
      <Services />
      <Portfolio />
      <Features />
      <Testimonial />
      <CTA />
    </>
  );
}

export default App;
>>>>>>> e2edfb0e56c42c7d2f69284ecc46eadb58cfa8e4
