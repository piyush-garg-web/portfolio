import Container from "./Container";

function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`scroll-section py-24 md:py-32 ${className}`}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}

export default Section;
