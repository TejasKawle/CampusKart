import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

const SellProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user from useAuth():", user);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     

    // ✅ Step 1: Check if user is logged in
    if (!user || !user.id) {
      alert("You must be logged in to post a product.");
      return;
    }

    // ✅ Step 2: Log user ID
    console.log("Posting Product with User ID:", user._id);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("image", selectedImage);
    data.append("userId", user.id); // ✅ Sending valid ID

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product Posted Successfully");
        navigate("/");
      } else {
        console.error("Error:", result);
        alert("Failed to Post Product: " + result.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.3)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Floating Blur Orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 w-56 h-56 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
      />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl my-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Sell Your Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Eg: Wireless Mouse"
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-300 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="text"
              name="price"
              placeholder="Eg: 500"
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-300 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Eg: Hostel C, Room 17"
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-300 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write something about the product..."
              rows="3"
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-300 text-white"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full text-sm text-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 py-3 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
          >
            Post Product
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SellProduct;
