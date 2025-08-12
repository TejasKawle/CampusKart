import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import {
  Search,
  User,
  Plus,
  Sparkles,
  Zap,
  ShoppingBag,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const NavBar = ({ searchTerm, setSearchTerm, scrollToProducts }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const navbarBlur = useTransform(scrollY, [0, 100], [10, 20]);
  const [localSearch, setLocalSearch] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleSellClick = () => {
    if (user) {
      navigate("/sell");
    } else {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000); // Hide after 3 seconds
    }
  };
  const handleSearch = () => {
    setSearchTerm(localSearch);
    scrollToProducts();
    setLocalSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        backdropFilter: `blur(${navbarBlur}px)`,
        opacity: navbarOpacity,
      }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cyan-500/10"
          : "bg-black/10 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="relative px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <Link
              to="/"
              className="group flex items-center gap-3 text-2xl md:text-3xl font-black tracking-tight transition-all duration-300"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Zap className="w-2.5 h-2.5 text-white" />
                </motion.div>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300">
                CampusKart
              </span>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-[50%] lg:w-[40%] relative group flex-shrink"
          >
            <div
              className={`relative transition-all duration-500 ${
                searchFocused ? "transform scale-105" : "transform scale-100"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl blur-xl transition-all duration-500 ${
                  searchFocused
                    ? "opacity-100 scale-110"
                    : "opacity-0 scale-100"
                }`}
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for textbooks, laptops, phones..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-2xl border border-white/20 px-6 py-3 pr-14 bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300 shadow-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  onClick={() => setSearchTerm(localSearch)}
                >
                  <Search className="w-4 h-4" />
                </motion.button>
              </div>
              <motion.div
                animate={{
                  opacity: searchFocused ? 1 : 0,
                  y: searchFocused ? 0 : -10,
                }}
                className="absolute top-full left-0 right-0 mt-2 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>Popular: MacBook, iPhone, Calculus Textbook</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Nav Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 md:gap-4 justify-center md:justify-end flex-wrap md:flex-nowrap"
          >
            {user ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="group px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-2xl hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20"
                  >
                    <User className="w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span className="group-hover:text-cyan-400 transition-colors duration-300">
                      My account
                    </span>
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={handleLogout}
                    className="group px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-2xl hover:border-red-400/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 shadow-lg hover:shadow-red-500/20"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Logout</span>
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="group px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-2xl hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20"
                  >
                    <User className="w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300" />
                    <span className="group-hover:text-cyan-400 transition-colors duration-300">
                      Login
                    </span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/signup"
                    className="group px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Signup</span>
                  </Link>
                </motion.div>
              </>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handleSellClick}
                className="group px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
                <span>Sell</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs"
                >
                  💰
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {showLoginAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Please log in to sell items.
          </motion.div>
        )}
      </div>
    </motion.nav>
  ); 
};

export default NavBar;
