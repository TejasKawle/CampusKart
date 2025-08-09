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

    // If user not logged in, redirect to login
    if (!storedUser) return navigate("/login");

    setUser(storedUser);

    // Fetch products posted by this user
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

      // Remove the deleted product from the UI
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
      className="p-8 bg-gray-100 min-h-screen"
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Welcome, {user?.name}
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Listings</h3>

        {products.length === 0 ? (
          <p className="text-gray-500">You haven’t posted anything yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white shadow-md rounded-lg overflow-hidden border"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold">{product.title}</h4>
                  <p className="text-blue-600 font-semibold">
                    ₹{product.price}
                  </p>
                  <p className="text-sm text-gray-600">{product.location}</p>
                  <p className="mt-2 text-gray-700 text-sm">
                    {product.description}
                  </p>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    {/* Optional Edit button */}
                    {/* <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
