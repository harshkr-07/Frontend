import React, { useState, useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const { menuItems, loading, error, isAuthenticated, addToCart } =
    useContext(StoreContext);

  // Initialize filtered items and categories when menuItems changes
  React.useEffect(() => {
    if (menuItems && menuItems.length > 0) {
      setFilteredItems(menuItems);
      const uniqueCategories = [
        "All",
        ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    }
  }, [menuItems]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/menu" } });
      return;
    }
    addToCart(item);
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    const filtered = menuItems.filter((item) => {
      return category === "All" || item.category === category;
    });
    setFilteredItems(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <h1 className="mt-4 text-xl font-semibold text-gray-700">
            Loading menu items...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-3">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Menu
        </h1>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
          <p className="text-yellow-700">
            No menu items available at the moment.
          </p>
          <p className="text-sm mt-2 text-yellow-600">
            Please check back later or contact support if this persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Discover Our Menu
            </h1>
            {!isAuthenticated && (
              <p className="text-indigo-100 text-lg mt-4">
                Please login to add items to your cart
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === cat
                  ? "bg-white text-indigo-600 shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="w-20 h-20 mx-auto mb-4 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No items found
            </h3>
            <p className="text-gray-500">
              We couldn't find any menu items matching your search.
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => filterByCategory("All")}
                className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View all items
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.itemname}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {item.itemname}
                    </h3>
                    <p className="text-white/90 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹
                      {parseFloat(item.price).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={loading}
                      className={`flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "+"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
