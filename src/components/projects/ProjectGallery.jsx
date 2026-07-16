import { useState } from "react";
import { motion } from "framer-motion";

import ProjectLightbox from "./ProjectLightbox";
import { motionConfig, scaleRevealVariants, staggerContainerVariants, viewportConfig } from "../../utils/motion";

function ProjectGallery({ cover, gallery }) {
  const images = [cover, ...gallery];

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

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
          variants={scaleRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{
            y: motionConfig.hoverLift,
            scale: motionConfig.hoverScale,
            borderColor: "rgba(139, 92, 246, 0.3)",
            boxShadow: "0 25px 50px rgba(124, 58, 237, 0.2)",
          }}
          transition={{ duration: motionConfig.normal, ease: motionConfig.ease }}
          className="project-image relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/10 transition-shadow duration-300 bg-white/5"
        >
          {/* Glass reflection sheen sweep */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={hovered ? { x: "150%" } : { x: "-150%" }}
            transition={{ duration: 1.2, ease: motionConfig.ease }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transform -skew-x-12 z-10"
          />

          <motion.img
            src={images[selected]}
            alt="Project cover"
            loading="lazy"
            decoding="async"
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: motionConfig.slow, ease: motionConfig.ease }}
            className="aspect-video w-full object-cover"
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

export default ProjectGallery;