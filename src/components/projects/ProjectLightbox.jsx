import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function ProjectLightbox({
  open,
  images,
  current,
  setCurrent,
  onClose,
}) {
  if (!images.length) return null;

  const previous = () =>
    setCurrent((current - 1 + images.length) % images.length);

  const next = () =>
    setCurrent((current + 1) % images.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute right-8 top-8 rounded-full bg-white/10 p-3 hover:bg-white/20"
          >
            <X size={24} />
          </button>

          <button
            onClick={previous}
            className="absolute left-8 rounded-full bg-white/10 p-3 hover:bg-white/20"
          >
            <ChevronLeft size={30} />
          </button>

          <motion.img
            key={images[current]}
            src={images[current]}
            alt="Project Screenshot"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl"
          />

          <button
            onClick={next}
            className="absolute right-8 rounded-full bg-white/10 p-3 hover:bg-white/20"
          >
            <ChevronRight size={30} />
          </button>

          <div className="absolute bottom-8 rounded-full bg-white/10 px-5 py-2">
            {current + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectLightbox;