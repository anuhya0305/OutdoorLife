import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import {
  getProductById,
  updateProduct,
} from "../../services/ProductService";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    stock: "",
    rating: "",
    image: "",
    description: "",
  });



  useEffect(() => {
    getProductById(id).then(setProduct).catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const updatedProduct = {
        ...product,
        price: Number(product.price),
        oldPrice: Number(product.oldPrice),
        stock: Number(product.stock),
        rating: Number(product.rating),
      };

      await updateProduct(id, updatedProduct);

      alert("Product Updated Successfully ✅");

      navigate("/admin/products");

    } catch (error) {

      console.error(error);

      alert("Failed to Update Product");

    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

          <h1 className="text-3xl font-bold mb-2">
            Edit Product
          </h1>

          <p className="text-gray-500 mb-8">
            Update product information.
          </p>

          <form
            onSubmit={handleUpdate}
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border rounded-xl p-4"
            >
              <option>Camping</option>
              <option>Hiking</option>
              <option>Backpacks</option>
              <option>Lighting</option>
              <option>Survival</option>
            </select>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="number"
              name="oldPrice"
              value={product.oldPrice}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="number"
              step="0.1"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="border rounded-xl p-4 md:col-span-2"
            />

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="5"
              className="border rounded-xl p-4 md:col-span-2 resize-none"
            />

            <div className="md:col-span-2 flex justify-end gap-4">

              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-green-700 text-white hover:bg-green-800"
              >
                Update Product
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProduct;