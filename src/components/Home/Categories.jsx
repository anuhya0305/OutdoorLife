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
    icon: FaCampground,
  },
  {
    id: 2,
    name: "Hiking",
    icon: FaHiking,
  },
  {
    id: 3,
    name: "Survival",
    icon: FaFire,
  },
  {
    id: 4,
    name: "Backpacks",
    icon: FaShoppingBag,
  },
  {
    id: 5,
    name: "Lighting",
    icon: FaLightbulb,
  },
];

const Categories = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-100">

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8">

          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-5 md:p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
              >
                <div className="text-green-700 flex justify-center mb-4">
                  <Icon className="text-3xl md:text-4xl" />
                </div>

                <h3 className="font-semibold text-base md:text-lg">
                  {item.name}
                </h3>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Categories;