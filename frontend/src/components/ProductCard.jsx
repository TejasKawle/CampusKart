import { Link } from "react-router-dom";

const ProductCard = ({ id, image, title, price, location }) => {
  return (
    <Link
      to={`/product/${id}`}
      className="block group transition-all duration-300"
    >
      <div className="w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-2 transition-all duration-300 mx-auto relative">
        {/* Image Section */}
        <div className="w-full h-48 overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between h-36">
          <div>
            <h2 className="text-lg font-semibold text-white truncate">
              {title}
            </h2>
            <p className="text-sm text-gray-400"> Location : {location}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-white font-bold text-xl"> ₹ {price} </span>
            <button className="px-3 py-1 bg-cyan-600 text-sm rounded-md text-white font-semibold hover:bg-cyan-700 transition">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
