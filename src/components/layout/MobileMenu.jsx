import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import navigation from "../../data/navigation";
import useActiveSection from "../../hooks/useActiveSection";

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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/10 bg-[#09090b] p-8 shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mt-20 flex flex-col gap-8">
              {navigation.map((item) => {
                const active =
                  activeSection === item.href.replace("#", "");

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`relative w-fit text-xl font-medium transition-all duration-300 ${
                      active
                        ? "text-violet-400"
                        : "text-gray-300 hover:text-violet-400"
                    }`}
                  >
                    {item.name}

                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-violet-500 transition-all duration-300 ${
                        active ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
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