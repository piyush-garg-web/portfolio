function ProjectGallery({ cover }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <img
        src={cover}
        alt=""
        className="w-full object-cover transition duration-500 hover:scale-105"
      />
    </div>
  );
}

export default ProjectGallery;