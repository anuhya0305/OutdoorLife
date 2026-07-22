const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-96 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  );
};

export default SearchBar;