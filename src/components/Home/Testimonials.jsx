import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    review: "Amazing quality products. Perfect for trekking.",
  },
  {
    id: 2,
    name: "Priya Reddy",
    review: "Fast delivery and premium camping equipment.",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    review: "The backpack quality exceeded my expectations.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl p-6 md:p-8"
            >
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 italic text-sm md:text-base leading-relaxed">
                "{item.review}"
              </p>

              <h3 className="mt-5 md:mt-6 text-lg font-bold text-green-700">
                {item.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;