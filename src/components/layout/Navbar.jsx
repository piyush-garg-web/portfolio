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

    window.addEventListener("mousemove", handleMouseMove);
    headerRef.current?.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      headerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
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
        {/* Decorative gradient orbs behind navbar - enhanced visibility */}
        <motion.div
          className="absolute -left-16 top-0 h-24 w-24 rounded-full bg-violet-600/50 blur-2xl pointer-events-none"
          style={{ x: leftOrbX }}
          animate={{
            y: [0, -4, 0],
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            opacity: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute -right-16 top-0 h-20 w-20 rounded-full bg-fuchsia-600/45 blur-2xl pointer-events-none"
          style={{ x: rightOrbX }}
          animate={{
            y: [0, 4, 0],
            opacity: [0.35, 0.55, 0.35],
            scale: [1, 1.15, 1],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
            opacity: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            },
            scale: {
              duration: 5,
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
          className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border transition-all duration-700 relative ${
            scrolled
              ? "border-white/30 bg-black/90 px-6 py-2.5 shadow-2xl shadow-black/70 backdrop-blur-[50px]"
              : "border-white/20 bg-black/60 px-6 py-4 backdrop-blur-2xl shadow-xl shadow-black/40"
          }`}
        >
          {/* Glass highlight - enhanced */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
            style={{ x: highlightX }}
          />
          {/* Inner light - enhanced */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
            style={{ x: lightX, y: lightY }}
          />
          {/* Breathing border glow - stronger */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-600/30 via-fuchsia-600/40 to-blue-600/30 pointer-events-none"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Periodic glass shine - stronger */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-white/20 to-transparent pointer-events-none"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 5,
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
                      className={`relative z-10 pb-1 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? "text-violet-300"
                          : "text-gray-300 hover:text-white"
                      }`}
                      whileHover={{ y: -3, scale: 1.03, z: 10 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {item.name}
                      {/* Subtle text glow on hover */}
                      {active && (
                        <motion.span
                          className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.a>

                    {/* Active indicator with layout animation */}
                    {active && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500"
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