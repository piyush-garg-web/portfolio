import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

function Button({
  children,
  href,
  target = "_self",
  variant = "primary",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shineKey, setShineKey] = useState(0);

  // Magnetic effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.1;
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.1;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Periodic shine every 8-10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShineKey((prev) => prev + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/40",

    secondary:
      "border border-white/10 bg-white/5 text-white backdrop-blur-xl",
  };

  const content = (
    <motion.div
      ref={ref}
      style={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.96, y: 1 }}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 17,
      }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {/* Periodic shine + hover shine */}
      {variant === "primary" && (
        <motion.div
          key={shineKey}
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 7.8,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
        />
      )}

      {/* Glow effect on hover */}
      {variant === "primary" && (
        <div className="absolute inset-0 rounded-xl bg-violet-500/0 transition-colors duration-300 group-hover:bg-violet-500/40 blur-2xl" />
      )}

      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="group"
      >
        {content}
      </a>
    );
  }

  return (
    <button className="group" {...props}>
      {content}
    </button>
  );
}

export default Button;