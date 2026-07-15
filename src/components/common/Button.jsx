function Button({
  children,
  href,
  target = "_self",
  variant = "primary",
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-violet-600 text-white hover:bg-violet-500 hover:scale-105 hover:shadow-lg hover:shadow-violet-600/30",

    secondary:
      "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 hover:border-violet-500/40 hover:scale-105",
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;