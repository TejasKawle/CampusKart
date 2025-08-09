import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Users,
  ShoppingBag,
  BookOpen,
  Laptop,
  Smartphone,
  Headphones,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.3)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 max-w-6xl mx-auto text-center space-y-8"
        >
        

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
              <motion.div
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                BUY & SELL
              </motion.div>
              <motion.div
                className="text-white mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                STUDENT ESSENTIALS
              </motion.div>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Your premium campus marketplace for textbooks, electronics, gadgets,
            and study materials. Connect with fellow students and discover
            incredible deals in a futuristic shopping experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                Browse Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                Start Selling
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-20 left-10 text-6xl opacity-20"
            >
              📚
            </motion.div>
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-40 right-20 text-5xl opacity-20"
              style={{ animationDelay: "2s" }}
            >
              💻
            </motion.div>
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute bottom-40 left-20 text-4xl opacity-20"
              style={{ animationDelay: "4s" }}
            >
              📱
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                value: `${products.length}+`,
                label: "Active Listings",
                color: "from-cyan-400 to-blue-500",
              },
              {
                icon: Users,
                value: "5K+",
                label: "Student Users",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: Star,
                value: "98%",
                label: "Successful Deals",
                color: "from-emerald-400 to-teal-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center space-y-6">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-lg font-medium">
                    {stat.label}
                  </div>
                  <div
                    className={`w-16 h-1 bg-gradient-to-r ${stat.color} mx-auto rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-8 mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-semibold tracking-wide">
                LATEST PRODUCTS
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white">
              Fresh Deals From
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 block mt-2">
                Students
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover amazing deals on textbooks, laptops, phones, calculators
              and more from your fellow students in our premium marketplace.
            </p>
          </motion.div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="h-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl animate-pulse"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="p-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                <motion.div
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-9xl mb-8 opacity-60"
                >
                  📚
                </motion.div>
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
                  No Products Listed Yet
                </h3>
                <p className="text-xl text-gray-300 mb-10 max-w-md mx-auto">
                  Be the first student to list your books, electronics or
                  gadgets for sale!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    List Your First Item
                    <span className="text-2xl">💡</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    id={product._id}
                    image={`http://localhost:5000${product.imageUrl}`}
                    title={product.title}
                    price={product.price}
                    location={product.location}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Popular Categories
            </h3>
            <p className="text-xl text-gray-300">
              What students are buying and selling most
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                label: "Textbooks",
                emoji: "📚",
                color: "from-blue-400 to-cyan-500",
              },
              {
                icon: Laptop,
                label: "Laptops",
                emoji: "💻",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: Smartphone,
                label: "Phones",
                emoji: "📱",
                color: "from-emerald-400 to-teal-500",
              },
              {
                icon: Headphones,
                label: "Electronics",
                emoji: "🎧",
                color: "from-orange-400 to-red-500",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="relative mb-6">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {category.emoji}
                  </motion.div>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {category.label}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="relative p-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl text-center overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.8),transparent_50%)]" />
            </div>

            <div className="relative z-10 space-y-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Got Something to Sell?
              </h3>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Turn your unused textbooks, gadgets, and electronics into cash.
                List them now and reach thousands of students in our premium
                marketplace!
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  📖 Sell Textbooks
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl font-bold text-lg shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  📱 Sell Electronics
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
