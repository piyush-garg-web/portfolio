import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import navigation from "../../data/navigation";
import useActiveSection from "../../hooks/useActiveSection";
import { motionConfig } from "../../utils/motion";

function MobileMenu({ open, setOpen }) {
  const activeSection = useActiveSection();

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard support: close on Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: motionConfig.slow, ease: motionConfig.ease }}
            className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/15 bg-[#09090b] p-8 shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mt-20 flex flex-col gap-8">
              {navigation.map((item, index) => {
                const itemId = item.href.replace("#", "");
                const active = activeSection === itemId;

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{
                      duration: motionConfig.normal,
                      delay: motionConfig.staggerFast * index,
                      ease: motionConfig.ease,
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: motionConfig.tapScale }}
                    className={`relative w-fit text-xl font-medium transition-colors duration-300 ${
                      active
                        ? "text-violet-300"
                        : "text-gray-300 hover:text-violet-400"
                    }`}
                  >
                    {item.name}

                    {active && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 28,
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;