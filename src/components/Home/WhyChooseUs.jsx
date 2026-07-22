import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaAward,
} from "react-icons/fa";

const data = [
  {
    icon: <FaTruck size={40} />,
    title: "Free Delivery",
    desc: "Free delivery across India."
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Secure Payments",
    desc: "100% secure online payments."
  },
  {
    icon: <FaAward size={40} />,
    title: "Premium Quality",
    desc: "Trusted outdoor brands."
  },
  {
    icon: <FaHeadset size={40} />,
    title: "24×7 Support",
    desc: "Always ready to help."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-[1400px] mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose OutdoorLife?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition"
            >
              <div className="text-green-700 flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;