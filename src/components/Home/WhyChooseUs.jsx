import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaAward,
} from "react-icons/fa";

const data = [
  {
    icon: FaTruck,
    title: "Free Delivery",
    desc: "Free delivery across India."
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payments",
    desc: "100% secure online payments."
  },
  {
    icon: FaAward,
    title: "Premium Quality",
    desc: "Trusted outdoor brands."
  },
  {
    icon: FaHeadset,
    title: "24×7 Support",
    desc: "Always ready to help."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14">
          Why Choose OutdoorLife?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {data.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-2xl transition"
              >
                <div className="text-green-700 flex justify-center mb-5">
                  <Icon className="text-3xl md:text-4xl" />
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base">
                  {item.desc}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;