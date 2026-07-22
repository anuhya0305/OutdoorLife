const SortDropdown = ({ sortOrder, setSortOrder }) => {
  return (
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="p-3 rounded-lg border border-gray-300"
    >
      <option value="">Sort By</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
      <option value="rating">Highest Rating</option>
    </select>
  );
};

export default SortDropdown;