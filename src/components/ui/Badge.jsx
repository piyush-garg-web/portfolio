function Badge({ children, className = "" }) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        border-violet-500/20
        bg-violet-500/10
        px-4
        py-2
        text-sm
        font-medium
        text-violet-300
        backdrop-blur-md
        ${className}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;