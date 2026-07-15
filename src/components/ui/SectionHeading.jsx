function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-16 max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;