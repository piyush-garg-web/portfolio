import { motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Journey from "./components/sections/Journey";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/effects/CustomCursor";
import ScrollProgress from "./components/effects/ScrollProgress";
import Loader from "./components/effects/Loader";
import { motionConfig } from "./utils/motion";

function App() {
  return (
    <>
     <Loader />
    <ScrollProgress />

      <Navbar />

      <CustomCursor />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: motionConfig.slow, ease: motionConfig.ease, delay: 1.8 }}
      >
        <Hero />

        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </motion.main>
      <Footer />
    </>
  );
}

export default App;
