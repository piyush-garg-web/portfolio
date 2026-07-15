function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`rounded-xl bg-violet-600 px-6 py-3 font-medium transition-all duration-300 hover:bg-violet-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;