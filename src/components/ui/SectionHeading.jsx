function SectionHeading({
  subtitle,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      {subtitle && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl font-bold text-white md:text-5xl">
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