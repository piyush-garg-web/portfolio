import StatCard from "./StatCard";
import TechChip from "./TechChip";

function ProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">

      {/* Glow */}
      <div className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-r from-violet-600/30 to-blue-600/30 blur-3xl" />

      {/* Card */}
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

        <img
          src="/assets/images/profile/profile.JPG"
          alt="Piyush Garg"
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-3xl object-cover"
        />

        <div className="mt-6">

          <h3 className="text-2xl font-bold text-white">
            Piyush Garg
          </h3>

          <p className="mt-2 text-gray-400">
            Full Stack Developer
          </p>

        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">

          <StatCard
            value="246+"
            label="Solved"
          />

          <StatCard
            value="181+"
            label="LeetCode"
          />

          <StatCard
            value="65+"
            label="GFG"
          />

        </div>

        <div className="mt-8 flex flex-wrap gap-3">

          <TechChip>React</TechChip>

          <TechChip>Next.js</TechChip>

          <TechChip>Node.js</TechChip>

          <TechChip>AI</TechChip>

        </div>

      </div>
    </div>
  );
}

export default ProfileCard;