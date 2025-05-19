import React, { useState, useRef } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaCamera,
  FaUtensils,
  FaInfoCircle,
  FaTag,
  FaList,
} from "react-icons/fa";

const AddItem = () => {
  const [formData, setFormData] = useState({
    itemname: "",
    description: "",
    price: "",
    category: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (
      !formData.itemname ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !selectedFile
    ) {
      setErrorMsg("Please fill all fields and upload an image.");
      return;
    }

    const data = new FormData();
    data.append("itemname", formData.itemname);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", selectedFile);

    try {
      const res = await axios.post("https://backend-h7ew.onrender.com/api/add-item", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        setSuccessMsg("Item added successfully!");
        setFormData({ itemname: "", description: "", price: "", category: "" });
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        setErrorMsg(res.data.message || "Failed to add item.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to add item.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300 border border-gray-700">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 px-6 py-8">
            <h2 className="text-4xl font-extrabold text-center text-white flex items-center justify-center gap-3">
              <FaUtensils className="animate-bounce text-purple-300" />
              Add New Menu Item
            </h2>
          </div>

          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div
                onClick={() => fileInputRef.current.click()}
                className="relative w-40 h-40 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg overflow-hidden border-2 border-dashed border-purple-500 cursor-pointer flex items-center justify-center hover:border-purple-400 transition-all duration-300 group"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-gray-400 text-center group-hover:text-purple-400 transition-colors duration-300">
                    <FaCamera className="mx-auto text-3xl mb-2 animate-pulse" />
                    <span className="text-sm font-medium">
                      Click to Upload Image
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
            </div>

            {successMsg && (
              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-green-900/30 text-green-300 border border-green-700 animate-fade-in">
                <FaCheckCircle className="text-xl text-green-400" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-red-900/30 text-red-300 border border-red-700 animate-fade-in">
                <FaExclamationCircle className="text-xl text-red-400" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                  <FaUtensils className="text-purple-400" />
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemname"
                  value={formData.itemname}
                  onChange={handleChange}
                  placeholder="e.g., Paneer Butter Masala"
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-gray-100 placeholder-gray-400"
                />
              </div>

              <div className="group">
                <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-purple-400" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter item description..."
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 min-h-[120px] text-gray-100 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                    <FaTag className="text-purple-400" />
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₹
                    </span>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      className="w-full p-4 pl-10 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-gray-100 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                    <FaList className="text-purple-400" />
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Main course"
                    className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-gray-100 placeholder-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <FaUtensils className="text-xl" />
                Add Item to Menu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
