import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { motionConfig } from "../../utils/motion";

function Loader() {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  // Mobile opens directly into the Hero entrance so an overlay never delays
  // the first visible page. Desktop retains the branded loading sequence.
  const [loading, setLoading] = useState(() => !isMobile);

  useEffect(() => {
    if (isMobile) return undefined;

    // Keep the branded loader on desktop. The Hero mounts behind this overlay
    // and is ready before it exits.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030712]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: motionConfig.ease }}
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0, filter: "blur(12px)" }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: motionConfig.slow,
              ease: motionConfig.ease,
            }}
            className="text-6xl font-black tracking-wider text-white"
          >
            PG
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{
              duration: motionConfig.slow,
              ease: motionConfig.ease,
              delay: 0.3,
            }}
            className="mt-8 h-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          />

          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 0.6, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: motionConfig.normal,
              ease: motionConfig.ease,
              delay: 0.5,
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
