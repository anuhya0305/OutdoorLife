const Newsletter = () => {
  return (
    <section className="bg-green-800 py-20 text-white">
      <div className="max-w-[700px] mx-auto text-center px-8">

        <h2 className="text-4xl font-bold">
          Join Our Adventure Community
        </h2>

        <p className="mt-4">
          Get exclusive offers and outdoor tips.
        </p>

        <div className="mt-8 flex">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-4 rounded-l-lg outline-none text-black"
          />

          <button className="bg-orange-500 px-8 rounded-r-lg hover:bg-orange-600">
            Subscribe
          </button>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;