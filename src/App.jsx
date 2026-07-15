import Navbar from "./components/layout/Navbar";
import Section from "./components/layout/Section";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Section id="home" className="pt-40">
          <h1 className="text-6xl font-bold">
            Home
          </h1>
        </Section>

        <Section id="about">
          <h2 className="text-5xl font-bold">
            About
          </h2>
        </Section>

        <Section id="skills">
          <h2 className="text-5xl font-bold">
            Skills
          </h2>
        </Section>

        <Section id="projects">
          <h2 className="text-5xl font-bold">
            Projects
          </h2>
        </Section>

        <Section id="coding">
          <h2 className="text-5xl font-bold">
            Coding Journey
          </h2>
        </Section>

        <Section id="experience">
          <h2 className="text-5xl font-bold">
            Experience
          </h2>
        </Section>

        <Section id="education">
          <h2 className="text-5xl font-bold">
            Education
          </h2>
        </Section>

        <Section id="contact">
          <h2 className="text-5xl font-bold">
            Contact
          </h2>
        </Section>
      </main>
    </>
  );
}

export default App;