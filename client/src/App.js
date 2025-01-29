import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import HowWeWork from "./components/how-we-work";
import OurStory from "./components/ourstory";
import MeetOurTeam from "./components/team";
import Services from "./components/services";
import Features from "./components/features";
import Testimonial from "./components/testimonials";
import CTA from "./components/cta";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/Privacy&policy";
import BlogPage from "./pages/Blogs";
import Post from "./common/routes/post";
import Cookies from "js-cookie";
import Admin from "./pages/admin";
import Login from "./pages/login";
function App() {
  const heroRef = useRef(null);
  const howWeWorkRef = useRef(null);
  const ourStoryRef = useRef(null);
  const teamRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);
  const contactRef = useRef(null);

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
  };

  const AdminCheck = () => {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
      const checkAdmin = async () => {
        const token = Cookies.get("token");
        if (!token) {
          setIsAdmin(false);
          return;
        }

        try {
          const resp = await Post("/verif", { token });
          if (resp.status !== 200) {
            setIsAdmin(false);
          } else {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error(error);
          setIsAdmin(false);
        }
      };

      checkAdmin();
    }, []);

    return isAdmin ? <Admin /> : <Login />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar refs={refs} />
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
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminCheck />} />
        <Route
          path="/privacy&policy"
          element={
            <>
              <Navbar refs={refs} />
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <Navbar refs={refs} />
              <BlogPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
