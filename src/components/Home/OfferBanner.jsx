const OfferBanner = () => {
  return (
    <section className="bg-orange-500 text-white py-16">
      <div className="max-w-[1400px] mx-auto px-8 text-center">

        <h2 className="text-4xl font-bold">
          Flat 25% OFF
        </h2>

        <p className="mt-4 text-xl">
          On Camping Tents, Sleeping Bags & Hiking Backpacks
        </p>

        <button className="mt-8 bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Shop Offers
        </button>

      </div>
    </section>
  );
};

export default OfferBanner;