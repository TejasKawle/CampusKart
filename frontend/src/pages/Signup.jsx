import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Signup Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-900"
    >
      <div className="relative w-full max-w-md px-6 py-10 rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl shadow-cyan-500/10 font-sans">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-20 rounded-3xl blur-2xl" />

        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 relative z-10">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-white/10 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-white/10 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-white/10 bg-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
          >
            Signup
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
