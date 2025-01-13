import Features from "./components/features";
import HeroSection from "./components/hero-section";
import HowWeWork from "./components/how-we-work";
import Navbar from "./components/navbar";
import OurStory from "./components/ourstory";
import Portfolio from "./components/portfolio";
import Services from "./components/services";
import MeetOurTeam from "./components/team";




function App() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <HowWeWork/>
    <OurStory/>
    <MeetOurTeam/>
    <Services/>
    <Portfolio/>
    <Features/>

    </>
  );
}

export default App;
