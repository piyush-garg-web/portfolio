function GradientOrb({
  className = "",
  color = "bg-violet-600",
}) {
  return (
    <div
      className={`
        absolute
        rounded-full
        blur-[120px]
        opacity-30
        ${color}
        ${className}
      `}
    />
  );
}

export default GradientOrb;