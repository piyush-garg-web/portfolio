import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const [deferredContentMounted, setDeferredContentMounted] = useState(() => !isMobile);

  useEffect(() => {
    if (!isMobile) return undefined;

    // Let the browser paint the mounted Hero once before constructing the
    // below-the-fold motion trees. They still mount during the loader, without
    // waiting for any scroll interaction.
    const frame = requestAnimationFrame(() => setDeferredContentMounted(true));
    return () => cancelAnimationFrame(frame);
  }, [isMobile]);

  return (
    <>
     <Loader />
    <ScrollProgress />

      <Navbar />

      <CustomCursor />

      <motion.main
        // The desktop entrance remains unchanged. On mobile, starting the whole
        // document transparent hides the committed Hero until animation work
        // receives a frame.
        initial={isMobile ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionConfig.slow,
          ease: motionConfig.ease,
          delay: isMobile ? 0 : 1,
        }}
      >
        <Hero />

        {deferredContentMounted && (
          <>
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Contact />
          </>
        )}
      </motion.main>
      <Footer />
    </>
  );
}

export default App;
