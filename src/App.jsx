import Navbar from "./components/layout/Navbar";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Journey from "./components/sections/Journey";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/effects/CustomCursor";

import Section from "./components/layout/Section";

function App() {
  return (
    <>
      <Navbar />

      <CustomCursor />

      <main>
        <Hero />

        <About />

        <Skills />

        <Projects />

        <Journey />

       <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;