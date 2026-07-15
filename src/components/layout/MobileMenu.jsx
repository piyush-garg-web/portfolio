import { motion, AnimatePresence } from "framer-motion";
import navigation from "../../data/navigation";
import useActiveSection from "../../hooks/useActiveSection";

function MobileMenu({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/10 bg-[#09090b] p-8 lg:hidden"
          >
            <div className="mt-20 flex flex-col gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-xl font-medium text-gray-300 transition hover:text-violet-400"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;