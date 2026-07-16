import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function ProjectLightbox({
  open,
  images,
  current,
  setCurrent,
  onClose,
}) {
  const previous = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length, setCurrent]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length, setCurrent]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") previous();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, previous, next]);

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

  if (!images.length) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshots gallery"
        >
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-8 top-8 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>

          <button
            onClick={previous}
            aria-label="Previous screenshot"
            className="absolute left-8 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={30} />
          </button>

          <motion.img
            key={images[current]}
            src={images[current]}
            alt={`Project screenshot ${current + 1}`}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl"
          />

          <button
            onClick={next}
            aria-label="Next screenshot"
            className="absolute right-8 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors"
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