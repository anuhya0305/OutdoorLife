import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { useEffect, useState } from "react";  
import {
  getProducts,
  deleteProduct,
} from "../../services/ProductService";



const Products = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");


  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts().then(setProducts).catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      loadProducts();

      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-3xl font-bold">
                Products
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all store products.
              </p>

            </div>

            <Link
              to="/admin/add-product"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <FaPlus />
              Add Product
            </Link>

          </div>

          <div className="relative mb-8">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80 pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="py-4 text-left">Image</th>

                  <th className="text-left">Product</th>

                  <th className="text-left">Category</th>

                  <th className="text-left">Price</th>

                  <th className="text-left">Stock</th>

                  <th className="text-center">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b hover:bg-green-50 transition"
                  >

                    <td className="py-5">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                    </td>

                    <td className="font-semibold">
                      {product.name}
                    </td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      ₹{product.price}
                    </td>

                    <td>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {product.stock}
                      </span>

                    </td>

                    <td>

                      <div className="flex justify-center gap-3">

                        <Link
                          to={`/admin/edit-product/${product.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
                        >
                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Products;