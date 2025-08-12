// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));

    if (!storedUser) return navigate("/login");

    setUser(storedUser);
    fetchUserProducts(storedUser.id);
  }, []);

  const fetchUserProducts = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/users/${userId}`
      );

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Expected JSON, got: ${text.slice(0, 100)}...`);
      }

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Failed to delete product:", err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-emerald-700 mb-6 tracking-tight"
      >
        Welcome, {user?.name}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Your Listings
        </h3>

        {products.length === 0 ? (
          <p className="text-gray-500 text-lg italic">
            You haven’t posted anything yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h4 className="text-xl font-bold text-emerald-700">
                    {product.title}
                  </h4>
                  <p className="text-lg font-semibold text-emerald-500">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-600">{product.location}</p>
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex justify-end gap-3 mt-5">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow hover:from-red-400 hover:to-red-500 transition-all"
                    >
                      Delete
                    </motion.button>
                    {/* Optional Edit button */}
                    {/* <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow hover:from-blue-400 hover:to-blue-500 transition-all"
                    >
                      Edit
                    </motion.button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
