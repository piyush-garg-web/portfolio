function Button({
  children,
  href,
  target = "_self",
  variant = "primary",
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-500 text-white",

    secondary:
      "border border-white/10 bg-white/5 hover:bg-white/10 text-white",
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