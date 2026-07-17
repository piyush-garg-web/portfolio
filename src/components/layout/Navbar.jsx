import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import Button from "../common/Button";
import Logo from "../ui/Logo";
import MobileMenu from "./MobileMenu";

import navigation from "../../data/navigation";
import personal from "../../data/personal";
import useActiveSection from "../../hooks/useActiveSection";
import useScrolled from "../../hooks/useScrolled";

function Navbar() {
  const activeSection = useActiveSection();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const headerRef = useRef(null);

  // High performance mouse tracking using motion values (0 re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const header = headerRef.current;
    const handleMouseMove = (e) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.05);
        mouseY.set((e.clientY - centerY) * 0.05);
      }
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    header?.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      header?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Transformed style coordinates
  const leftOrbX = useTransform(springX, (val) => val * 2);
  const rightOrbX = useTransform(springX, (val) => -val * 2);
  const highlightX = useTransform(springX, (val) => val * 0.5);
  const lightX = useTransform(springX, (val) => val * 0.3);
  const lightY = useTransform(springY, (val) => val * 0.3);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 top-0 z-50 w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Ambient lighting behind navbar */}
        <motion.div
          className="absolute -left-20 top-0 h-32 w-32 rounded-full bg-violet-600/30 blur-3xl pointer-events-none"
          style={{ x: leftOrbX }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.25, 0.4, 0.25],
            scale: [1, 1.2, 1],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute -right-20 top-0 h-28 w-28 rounded-full bg-fuchsia-600/25 blur-3xl pointer-events-none"
          style={{ x: rightOrbX }}
          animate={{
            y: [0, 6, 0],
            opacity: [0.2, 0.35, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
            scale: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -24, filter: "blur(12px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: hovered ? 1.01 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
            scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border transition-all duration-700 relative overflow-hidden ${
            scrolled
              ? "border-white/30 bg-black/90 px-6 py-2.5 shadow-2xl shadow-black/70 backdrop-blur-[60px]"
              : "border-white/20 bg-black/60 px-6 py-4 backdrop-blur-3xl shadow-2xl shadow-black/50"
          }`}
        >
          {/* Animated gradient glow inside navbar */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-blue-600/10 pointer-events-none"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          />
          {/* Glass highlight */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
            style={{ x: highlightX }}
          />
          {/* Inner light */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/15 to-transparent pointer-events-none"
            style={{ x: lightX, y: lightY }}
          />
          {/* Moving border glow */}
          <motion.div
            className="absolute -inset-[2px] rounded-2xl pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, #8b5cf6 90deg, transparent 180deg, #d946ef 270deg, transparent 360deg)",
              opacity: 0.3,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="absolute inset-[2px] rounded-2xl bg-black/70 pointer-events-none" />
          {/* Periodic glass shine */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/25 to-transparent pointer-events-none"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 6,
            }}
          />

          <Logo />

          {/* Desktop Navigation */}
          <div className="relative hidden items-center gap-8 lg:flex perspective-800">
            <ul className="relative flex items-center gap-8">
              {navigation.map((item) => {
                const itemId = item.href.replace("#", "");
                const active = activeSection === itemId;

                return (
                  <li key={item.href} className="relative">
                    <motion.a
                      href={item.href}
                      className={`relative z-10 px-3 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full ${
                        active
                          ? "text-violet-200"
                          : "text-gray-300 hover:text-white"
                      }`}
                      whileHover={{ y: -4, scale: 1.04 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.name}
                      {/* Subtle text glow on hover */}
                      {active && (
                        <motion.span
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/40 via-fuchsia-500/30 to-blue-500/40 blur-md pointer-events-none"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.a>

                    {/* Active pill indicator with layout animation */}
                    {active && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className="absolute -z-0 -inset-1 rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-600/15 to-blue-600/20 backdrop-blur-sm border border-violet-500/30"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 28,
                          mass: 0.8,
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Button href={personal.resume}>
                Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setOpen(!open)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="text-white lg:hidden"
              aria-label="Toggle navigation menu"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {open ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </motion.button>
          </div>
        </motion.div>
      </header>

      <MobileMenu
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export default Navbar;
