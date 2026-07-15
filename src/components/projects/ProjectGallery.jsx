import { useState } from "react";

function ProjectGallery({ cover, gallery }) {
  const images = [cover, ...gallery];

  const [selected, setSelected] = useState(images[0]);

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-white/10">
        <img
          src={selected}
          alt="Project"
          className="aspect-video w-full object-cover transition duration-500"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setSelected(image)}
            className={`overflow-hidden rounded-xl border-2 transition ${
              selected === image
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
  );
}

export default ProjectGallery;