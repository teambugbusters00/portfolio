import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import {
  About,
  Achievement,
  AISkills,
  ComputersCanvas,
  Contact,
  Feedbacks,
  Hero,
  Navbar,
  Preloader,
  StarsCanvas,
  Works,
} from "./components";
import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";
import SkillKeyboard from "./components/SkillKeyboard";
import VirtualAssistant from "./components/VirtualAssistant";
import soundEffects from "./utils/soundEffects";

const App = () => {
  useEffect(() => {
    // Play magic sound when the app loads
    soundEffects.playMagic();
  }, []);

  return (
    <Preloader>
      <BrowserRouter>
        <div
          className="relative z-0"
          style={{ backgroundColor: "hsl(222.2 84% 4.9%)" }}
        >
          <ElasticCursor />
          <EasterEggs />
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <div className="relative w-full h-screen mx-auto">
            <ComputersCanvas />
          </div>
          <StarsCanvas />
          <About />
          <Achievement />
          <AISkills />
          <SkillKeyboard />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
          </div>
          <VirtualAssistant />
        </div>
      </BrowserRouter>
    </Preloader>
  );
};

export default App;
