import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-6 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-10 items-start font-['Inter',sans-serif]">
      {/* Product Image Section */}
      <div className="w-full md:w-1/2 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300">
          <img
            src={`http://localhost:5000${product.imageUrl}`}
            alt={product.title}
            className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Image Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full md:w-1/2 space-y-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg shadow-cyan-500/10">
        <h1 className="text-4xl font-bold text-white">{product.title}</h1>
        <p className="text-3xl text-green-400 font-bold">{product.price}</p>
        <p className="text-sm text-gray-300">{product.location}</p>
        <p className="text-gray-300 text-base leading-relaxed">
          {product.description}
        </p>

        <button className="mt-4 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 text-lg font-semibold">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
