
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Order = () => {
  const { cart, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
  });

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const phoneLast4 = formData.phone ? formData.phone.slice(-4) : "0000";
    return `ORD${timestamp}${phoneLast4}${random}`;
  };

  // Update orderId when form is valid
  useEffect(() => {
    if (isFormValid() && formData.phone.length >= 4) {
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
    }
  }, [formData]);

  // Check if all form fields are filled
  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  // Calculate total price of items in cart
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.price * item.quantity || 0),
      0
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isFormValid()) {
      alert(
        "Please fill in all delivery information fields before proceeding to payment."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate order ID
      const orderId = generateOrderId();

      // Prepare order data for backend
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        orderId: orderId,
        items: cart.map((item) => ({
          itemId: item._id,
          itemName: item.itemname,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: calculateTotal(),
        deliveryFee: 50,
        total: calculateTotal() + 50,
      };

      // Send order to backend
      const response = await axios.post(
        "https://restaurantbackend-zbxj.onrender.com/api/order",
        orderData
      );

      if (response.data.success) {
        // Prepare order data for payment page
        const paymentOrderData = {
          orderId: orderId,
          items: cart.map((item) => ({
            ...item,
            orderId: orderId,
            itemNumber: `ITEM${item._id.slice(-4)}`,
          })),
          subtotal: calculateTotal(),
          deliveryFee: 50,
          total: calculateTotal() + 50,
          userData: {
            ...formData,
            phone: formData.phone,
          },
          orderDate: new Date().toISOString(),
          status: "pending",
          backendOrderId: response.data.order._id // Save the MongoDB _id for future reference
        };

        // Store order data in localStorage for payment page
        localStorage.setItem("pendingOrder", JSON.stringify(paymentOrderData));
        clearCart(); // Clear the cart after successful order creation
        navigate("/payment");
      } else {
        throw new Error(response.data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert(
        `Failed to place order: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Delivery Information Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Delivery Information
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your delivery address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {isFormValid() && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Order ID:</p>
                <p className="text-lg font-bold text-blue-600">{orderId}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cart.length})</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Item Details:
                </h3>
                <div className="space-y-3">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-start text-sm text-gray-600"
                      >
                        <div>
                          <span className="font-medium">ID: {item._id}</span>
                          <p className="text-gray-500">
                            Item Name: {item.itemname}
                          </p>
                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <span className="font-medium">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No items in cart</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹50.00</span>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{(calculateTotal() + 50).toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  isFormValid() && !isSubmitting
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting
                  ? "Processing..."
                  : isFormValid()
                  ? "Cash on Delivery"
                  : "Fill Delivery Information"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;