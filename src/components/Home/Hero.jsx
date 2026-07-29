const Hero = () => {
  return (
    <section className="bg-green-800 text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-14 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* Left */}

        <div className="max-w-xl text-center md:text-left">

          <p className="text-orange-400 font-semibold mb-3">
            Outdoor Adventure Starts Here
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Gear Up For Your
            <span className="text-orange-400">
              {" "}Next Adventure
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-200">
            Premium camping equipment, hiking gear,
            trekking essentials and outdoor accessories
            delivered across India.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <button className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Shop Now
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-800 transition">
              Explore
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="w-full md:w-auto mt-8 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700"
            alt="Camping"
            className="rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-[550px]"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;