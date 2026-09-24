import { Link } from "react-router-dom";

const OfferBanner = () => {
  return (
    <section className="bg-orange-500 text-white py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          20% OFF Your First Order
        </h2>

        <p className="mt-4 text-base md:text-xl leading-relaxed">
          Use code WELCOME20 at checkout on tents, backpacks, lighting and more
        </p>

        <Link
          to="/shop"
          className="mt-8 inline-block bg-white text-orange-500 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition w-full sm:w-auto"
        >
          Shop Offers
        </Link>

      </div>
    </section>
  );
};

export default OfferBanner;
