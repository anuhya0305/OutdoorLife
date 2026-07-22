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
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl p-8"
            >
              <div className="flex text-yellow-400 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="text-gray-600 italic">
                "{item.review}"
              </p>

              <h3 className="mt-6 font-bold text-green-700">
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