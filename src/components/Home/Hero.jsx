const Hero = () => {
  return (
    <section className="bg-green-800 text-white">
      <div className="max-w-[1400px] mx-auto px-8 py-24 flex flex-col md:flex-row items-center justify-between">

        {/* Left */}

        <div className="max-w-xl">

          <p className="text-orange-400 font-semibold mb-3">
            Outdoor Adventure Starts Here
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Gear Up For Your
            <span className="text-orange-400">
              {" "}Next Adventure
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Premium camping equipment, hiking gear,
            trekking essentials and outdoor accessories
            delivered across India.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Shop Now
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-800 transition">
              Explore
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="mt-12 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700"
            alt="Camping"
            className="rounded-2xl shadow-2xl w-[550px]"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;