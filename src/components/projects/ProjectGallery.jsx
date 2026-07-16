import { useState } from "react";
import { motion } from "framer-motion";

import ProjectLightbox from "./ProjectLightbox";

function ProjectGallery({ cover, gallery }) {
  const images = [cover, ...gallery];

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <div>
        <motion.div
          onClick={() => setOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-black/10 transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] bg-white/5"
        >
          {/* Subtle reflection overlay */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={hovered ? { x: "150%" } : { x: "-150%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12 z-10"
          />

          <img
            src={images[selected]}
            alt="Project cover"
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] hover:scale-103"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-4 flex flex-wrap gap-3"
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              onClick={() => setSelected(index)}
              aria-label={`View screenshot ${index + 1}`}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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