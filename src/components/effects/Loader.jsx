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
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#09090b]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="text-6xl font-black tracking-wider"
          >
            PG
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{
              duration: 1.4,
            }}
            className="mt-8 h-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />

          <p className="mt-6 text-sm uppercase tracking-[0.35em] text-gray-400">
            Loading Portfolio
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;