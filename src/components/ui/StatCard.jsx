function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
      <h3 className="text-2xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        {label}
      </p>
    </div>
  );
}

export default StatCard;