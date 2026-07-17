import { memo, useState, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import ProjectLightbox from "./ProjectLightbox";
import { motionConfig, scaleRevealVariants, staggerContainerVariants, viewportConfig } from "../../utils/motion";

function ProjectGallery({ cover, gallery }) {
  const images = useMemo(() => [cover, ...gallery], [cover, gallery]);

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.03;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.03;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: motionConfig.normal, ease: motionConfig.ease },
    },
  };

  return (
    <>
      <div>
        <motion.div
          ref={ref}
          variants={scaleRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            handleMouseLeave();
          }}
          onMouseMove={handleMouseMove}
          style={{
            x: springX,
            y: springY,
            rotateX: springY,
            rotateY: springX,
          }}
          whileHover={{
            scale: motionConfig.hoverScale,
          }}
          transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.7 }}
          className="project-image gpu-layer relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-xl shadow-black/15 transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(124,58,237,0.3)]"
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-blue-600/30 pointer-events-none"
            animate={{
              opacity: hovered ? [0.4, 0.7, 0.4] : [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Glass reflection sheen sweep - periodic */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={{ x: "150%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transform -skew-x-12 z-10"
          />

          {/* Ambient glow behind the image */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent blur-xl pointer-events-none"
            animate={{
              opacity: hovered ? [0.4, 0.6, 0.4] : [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.img
            src={images[selected]}
            alt="Project cover"
            loading="lazy"
            decoding="async"
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: motionConfig.slow, ease: motionConfig.ease }}
            className="gpu-layer aspect-video w-full object-cover relative z-10"
          />
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-4 flex flex-wrap gap-3"
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => setSelected(index)}
              aria-label={`View screenshot ${index + 1}`}
              whileHover={{
                y: -3,
                scale: 1.08,
                borderColor: "rgba(139, 92, 246, 0.5)",
                boxShadow: "0 8px 16px rgba(124, 58, 237, 0.2)",
              }}
              whileTap={{ scale: motionConfig.tapScale }}
              transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
              className={`overflow-hidden rounded-xl border-2 transition-colors duration-300 ${
                selected === index
                  ? "border-violet-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`Project screenshot ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-16 w-24 object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      <ProjectLightbox
        open={open}
        images={images}
        current={selected}
        setCurrent={setSelected}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default memo(ProjectGallery);
