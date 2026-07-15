function ProfileCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <img
          src="/assets/images/profile/profile.JPG"
          alt="Piyush Garg"
          className="aspect-square w-full rounded-2xl object-cover"
        />

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">
            Piyush Garg
          </h3>

          <p className="mt-2 text-gray-400">
            Full Stack Developer
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;