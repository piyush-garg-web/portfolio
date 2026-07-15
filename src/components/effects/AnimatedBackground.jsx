function AnimatedBackground() {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-[#030712]" />

      {/* Grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}

export default AnimatedBackground;