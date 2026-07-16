import { motion } from "framer-motion";

const letters = "Piyush".split("");

function Logo() {
  return (
    <a
      href="#home"
      className="group text-2xl font-black tracking-tight"
    >
      <motion.span
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        whileHover={{ y: -3, scale: 1.03 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-flex"
      >
        {/* Letter Reveal */}
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-white transition-colors duration-300 group-hover:text-violet-200"
          >
            {letter}
          </motion.span>
        ))}

        {/* Animated Violet Dot */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.15, 1],
          }}
          transition={{
            opacity: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            delay: 0.3 + letters.length * 0.06,
          }}
          className="inline-block text-violet-500"
        >
          .
        </motion.span>
      </motion.span>
    </a>
  );
}

export default Logo;