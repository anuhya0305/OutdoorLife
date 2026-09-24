import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import Header from "../../components/Admin/Header";
import { addProduct } from "../../services/ProductService";
import { FaTimes } from "react-icons/fa";
import { useRef } from "react";

const MAX_IMAGE_BYTES = 1024 * 1024;

const AddProduct = () => {
  const navigate = useNavigate();

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

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        ...product,
        image: product.image,
        id: String(Date.now()),
        price: Number(product.price),
        oldPrice: Number(product.oldPrice),
        stock: Number(product.stock),
        rating: Number(product.rating),
        featured: false,
        deal: false,
        bestSeller: false,
      };

      await addProduct(newProduct);

      alert("Product Added Successfully ✅");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Product");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">

      <Sidebar />

      <div className="flex-1 p-8">

        <Header />

        <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

          <h1 className="text-3xl font-bold mb-2">
            Add Product
          </h1>

          <p className="text-gray-500 mb-8">
            Fill the details below to add a new product.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            >
              <option value="">Select Category</option>
              <option>Camping</option>
              <option>Hiking</option>
              <option>Backpacks</option>
              <option>Lighting</option>
              <option>Survival</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="number"
              name="oldPrice"
              placeholder="Old Price"
              value={product.oldPrice}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={product.stock}
              onChange={handleChange}
              className="border rounded-xl p-4"
              required
            />

            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={product.rating}
              onChange={handleChange}
              className="border rounded-xl p-4"
            />

            {/* Image Upload */}

            <div className="md:col-span-2">

              <label className="block font-semibold mb-3">
                Product Image
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  if (file.size > MAX_IMAGE_BYTES) {
                    alert("Image must be 1 MB or smaller.");
                    e.target.value = "";
                    return;
                  }

                  // Store the image itself (as a data URL), not a temporary blob: link
                  // that only works in this browser tab.
                  const reader = new FileReader();
                  reader.onload = () => setProduct((p) => ({ ...p, image: reader.result }));
                  reader.readAsDataURL(file);
                }}
                className="w-full border rounded-xl p-3"
              />

              {product.image && (
                <div className="relative mt-5 inline-block">

                  <img
                    src={product.image}
                    alt="Preview"
                    className="w-52 h-52 object-cover rounded-2xl shadow-lg border"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setProduct({
                        ...product,
                        image: "",
                      });

                      fileInputRef.current.value = "";
                    }}
                    className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <FaTimes size={14} />
                  </button>

                </div>
              )}

            </div>

            <textarea
              name="description"
              placeholder="Product Description"
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
                Add Product
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;