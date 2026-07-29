const Newsletter = () => {
  return (
    <section className="bg-green-800 py-12 md:py-20 text-white">
      <div className="max-w-[700px] mx-auto text-center px-4 md:px-8">

        <h2 className="text-3xl md:text-4xl font-bold">
          Join Our Adventure Community
        </h2>

        <p className="mt-4 text-sm md:text-base leading-relaxed">
          Get exclusive offers and outdoor tips.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-0">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 rounded-lg sm:rounded-l-lg sm:rounded-r-none outline-none text-black"
          />

          <button className="bg-orange-500 px-8 py-4 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-orange-600 transition">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;