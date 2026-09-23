const CategoryFilter = ({ categories, selected, setSelected }) => {
  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="w-full lg:w-64 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
    >
      <option value="All">All Categories</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;