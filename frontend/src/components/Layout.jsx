import { Outlet } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Zap, Heart, Code, Users, Shield } from "lucide-react";
import NavBar from "./NavBar";

const Layout = () => {
  const { scrollY } = useScroll();
  const footerY = useTransform(scrollY, [0, 300], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col font-['Inter',sans-serif] relative overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,119,198,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [-20, 40, -20],
            y: [-30, 20, -30],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50"
      >
        <NavBar />
      </motion.div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex-grow relative z-10"
      >
        <Outlet />
      </motion.main>

      {/* Futuristic Footer */}
      <motion.footer
        style={{ y: footerY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
        className="relative z-10 mt-auto"
      >
        {/* Footer Background with Glassmorphism */}
        <div className="relative">
          {/* Gradient Border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Main Footer Content */}
          <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-6 py-12">
              {/* Footer Top Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand Section */}
                <div className="md:col-span-2 space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25"
                      >
                        <Sparkles className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                      >
                        <Zap className="w-3 h-3 text-white m-0.5" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                        CampusKart
                      </h3>
                      <p className="text-sm text-gray-400">
                        Student Marketplace 2024
                      </p>
                    </div>
                  </motion.div>

                  <p className="text-gray-300 leading-relaxed max-w-md">
                    Empowering students to buy and sell textbooks, electronics,
                    and essentials in a secure, modern marketplace designed for
                    the digital generation.
                  </p>

                  {/* Social Stats */}
                  <div className="flex items-center gap-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
                    >
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium">5K+ Students</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
                    >
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-medium">Secure Deals</span>
                    </motion.div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Quick Links
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Browse Products",
                      "Sell Items",
                      "Categories",
                      "How It Works",
                    ].map((link, index) => (
                      <motion.a
                        key={link}
                        href="#"
                        whileHover={{ x: 5, color: "#06b6d4" }}
                        className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                      >
                        {link}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-white mb-4">Support</h4>
                  <div className="space-y-3">
                    {[
                      "Help Center",
                      "Safety Tips",
                      "Contact Us",
                      "Report Issue",
                    ].map((link, index) => (
                      <motion.a
                        key={link}
                        href="#"
                        whileHover={{ x: 5, color: "#a855f7" }}
                        className="block text-gray-400 hover:text-purple-400 transition-colors duration-300"
                      >
                        {link}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider with Gradient */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="relative flex justify-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="bg-gradient-to-r from-slate-900 to-purple-900 px-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <span>&copy; {new Date().getFullYear()}</span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer"
                  >
                    CampusKart
                  </motion.span>
                  <span>. All rights reserved.</span>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-red-400 fill-current" />
                  </motion.div>
                  <span>for students</span>
                </motion.div>

                {/* Tech Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-cyan-400/20 shadow-lg shadow-cyan-500/10"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                  <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Powered by Innovation
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm" />
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Layout;
