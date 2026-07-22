const CategoryFilter = ({ categories, selected, setSelected }) => {
  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="p-3 rounded-lg border border-gray-300"
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