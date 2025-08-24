import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {jwtDecode} from "jwt-decode";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);



 
  // ------------------- Fetch product -------------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  

  // ------------------- Handle Buy Now -------------------
  const handleBuyNow = async () => {
    try {
      setIsPurchasing(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in to make a purchase");

      const decoded = jwtDecode(token);
      const buyerId = decoded.id;

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          sellerId: product.user,
          buyerId,
          price: Number(product.price),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const data = await response.json();
      console.log("Order placed successfully:", data);

      // Success notification
      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center animate-fade-in";
      successMsg.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Order placed successfully!</span>
      `;
      document.body.appendChild(successMsg);

      setTimeout(() => {
        successMsg.classList.add("animate-fade-out");
        setTimeout(() => {
          if (document.body.contains(successMsg)) {
            document.body.removeChild(successMsg);
          }
        }, 300);
      }, 3000);
    } catch (error) {
      console.error("Error processing purchase:", error);

      const errorMsg = document.createElement("div");
      errorMsg.className =
        "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center animate-fade-in";
      errorMsg.innerHTML = `<span>${error.message}</span>`;
      document.body.appendChild(errorMsg);

      setTimeout(() => {
        errorMsg.classList.add("animate-fade-out");
        setTimeout(() => {
          if (document.body.contains(errorMsg)) {
            document.body.removeChild(errorMsg);
          }
        }, 300);
      }, 3000);
    } finally {
      setIsPurchasing(false);
    }
  };

  // ------------------- Loading & Product Not Found -------------------
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-300 text-lg">Loading product details...</p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start font-['Inter',sans-serif]">
        {/* Product Image */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={`http://localhost:5000${product.imageUrl}`}
                alt={product.title}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end">
              <div className="p-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm">Scroll for more details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6 bg-gray-800/30 backdrop-blur-md border border-gray-700/30 rounded-2xl p-8 shadow-xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {product.title}
            </h1>
            <div className="w-20 h-1 bg-cyan-500 rounded-full my-4"></div>
          </div>

          <p className="text-3xl text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
            ₹{product.price}
          </p>

          <div className="flex items-center text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{product.location}</span>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Description
            </h3>
            <p className="text-gray-300 text-base leading-relaxed bg-gray-800/20 p-4 rounded-lg border border-gray-700/30">
              {product.description}
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={handleBuyNow}
              disabled={isPurchasing}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                isPurchasing
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30"
              }`}
            >
              {isPurchasing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Buy Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add CSS animations for notifications */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fade-out {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
          .animate-fade-out {
            animation: fade-out 0.3s ease-in forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetail;
