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