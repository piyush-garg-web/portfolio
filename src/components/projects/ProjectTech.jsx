function ProjectTech({ tech }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {tech.map((item) => (
        <span
          key={item}
          className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default ProjectTech;