import Navbar from "./components/layout/Navbar";
import Section from "./components/layout/Section";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

       <About />

        <Skills />

        <Section id="projects">
          <h2 className="text-5xl font-bold">Projects</h2>
        </Section>

        <Section id="coding">
          <h2 className="text-5xl font-bold">Coding Journey</h2>
        </Section>

        <Section id="experience">
          <h2 className="text-5xl font-bold">Experience</h2>
        </Section>

        <Section id="education">
          <h2 className="text-5xl font-bold">Education</h2>
        </Section>

        <Section id="contact">
          <h2 className="text-5xl font-bold">Contact</h2>
        </Section>
      </main>
    </>
  );
}

export default App;