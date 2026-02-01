function Hero() {
  return (
    <figure className="diff h-[400px] md:h-[700px] w-full" tabIndex={0}>
      <div className="diff-item-1" role="img" tabIndex={0}>
        <div className="bg-primary text-primary-content grid place-content-center p-4">
          <div className="text-center flex flex-col items-center gap-2 md:gap-4 max-w-[90%] mx-auto">
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-none">
              Streamline Your Team Workflow Today Now
            </h1>
            <p className="hidden sm:block text-xs md:text-sm lg:text-base max-w-xl opacity-90">
              Organize projects and track progress in real-time. Boost your
              productivity and never miss another deadline.
            </p>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-xs sm:btn-sm md:btn-md btn-neutral cursor-pointer hover:scale-105 transition-transform">
                Get Started
              </button>
              <button className="btn btn-xs sm:btn-sm md:btn-md btn-ghost border-current cursor-pointer hover:bg-primary-focus">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="diff-item-2" role="img">
        <div className="bg-base-200 text-base-content grid place-content-center p-4">
          <div className="text-center flex flex-col items-center gap-2 md:gap-4 max-w-[90%] mx-auto">
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-none">
              Streamline Your Team Workflow Today Now
            </h1>
            <p className="hidden sm:block text-xs md:text-sm lg:text-base max-w-xl opacity-70">
              The ultimate solution for managing complex tasks effortlessly.
              Simplified tools designed for teams that value efficiency.
            </p>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-xs sm:btn-sm md:btn-md btn-primary cursor-pointer hover:scale-105 transition-transform">
                Get Started
              </button>
              <button className="btn btn-xs sm:btn-sm md:btn-md btn-outline cursor-pointer">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="diff-resizer"></div>
    </figure>
  );
}

export default Hero;