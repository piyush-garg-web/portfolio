import { useState } from "react";

import ProjectLightbox from "./ProjectLightbox";

function ProjectGallery({ cover, gallery }) {
  const images = [cover, ...gallery];

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div
          onClick={() => setOpen(true)}
          className="cursor-hover overflow-hidden rounded-3xl border border-white/10"
        >
          <img
            src={images[selected]}
            alt="Project"
            className="aspect-video w-full cursor-pointer object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelected(index)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                selected === index
                  ? "border-violet-500"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`Screenshot ${index + 1}`}
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
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