import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030712]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0, filter: "blur(8px)" }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-6xl font-black tracking-wider text-white"
          >
            PG
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2,
            }}
            className="mt-8 h-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />

          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 0.6, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
            }}
            className="mt-6 text-sm uppercase tracking-[0.35em] text-gray-400"
          >
            Loading Portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;