import { Check } from "lucide-react";

function FeatureList({ features }) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature}
          className="flex items-center gap-3"
        >
          <Check
            size={18}
            className="text-violet-400"
          />

          <span className="text-gray-300">
            {feature}
          </span>
        </div>
      ))}
    </div>
  );
}

export default FeatureList;