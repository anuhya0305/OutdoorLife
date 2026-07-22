import {
  FaCampground,
  FaHiking,
  FaFire,
  FaShoppingBag,
  FaLightbulb,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Camping",
    icon: <FaCampground size={35} />,
  },
  {
    id: 2,
    name: "Hiking",
    icon: <FaHiking size={35} />,
  },
  {
    id: 3,
    name: "Survival",
    icon: <FaFire size={35} />,
  },
  {
    id: 4,
    name: "Backpacks",
    icon: <FaShoppingBag size={35} />,
  },
  {
    id: 5,
    name: "Lighting",
    icon: <FaLightbulb size={35} />,
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-gray-100">

      <div className="max-w-[1400px] mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-12">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {categories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
            >
              <div className="text-green-700 flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;