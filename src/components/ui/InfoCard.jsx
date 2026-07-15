function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {value}
      </h3>
    </div>
  );
}

export default InfoCard;