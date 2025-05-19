import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // First try to get orderId from URL params or localStorage
        const storedOrder = localStorage.getItem("pendingOrder");
        const orderId =
          location.state?.orderId ||
          (storedOrder ? JSON.parse(storedOrder).orderId : null);

        if (!orderId) {
          setError("No order data found");
          setLoading(false);
          return;
        }

        // Fetch order data from backend
        const response = await axios.get(
          `https://restaurantbackend-zbxj.onrender.com/api/order/id/${orderId}`
        );

        if (response.data.success) {
          const order = response.data.order;
          setOrderData({
            orderId: order.orderId,
            orderDate: order.createdAt,
            userData: {
              firstName: order.firstName,
              lastName: order.lastName,
              email: order.email,
              phone: order.phone,
              address: order.address,
            },
            items: order.items,
            subtotal: order.subtotal,
            deliveryFee: order.deliveryFee,
            total: order.total,
          });
        } else {
          throw new Error("Failed to fetch order data");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Error loading order data");
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <h1 className="mt-6 text-2xl font-semibold text-gray-700 animate-pulse">
            Loading your order details...
          </h1>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl max-w-md transform hover:scale-105 transition-transform duration-300">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">
            {error || "Unable to load order details"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">Thank you for your order</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                  Order Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium text-gray-900">
                      {orderData.orderId || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium text-gray-900">
                      {orderData.orderDate
                        ? new Date(orderData.orderDate).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">
                      {orderData.userData?.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {orderData.userData?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Delivery Address
                </h2>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">
                    {orderData.userData?.firstName || ""}{" "}
                    {orderData.userData?.lastName || ""}
                  </p>
                  <p className="text-gray-600">
                    {orderData.userData?.address || "N/A"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                  Order Items
                </h2>
                <div className="space-y-4">
                  {orderData.items?.map((item) => (
                    <div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.itemName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-blue-600">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">
                  ₹{Number(orderData.subtotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium text-gray-900">
                  ₹{Number(orderData.deliveryFee || 0).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    ₹{Number(orderData.total || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-blue-600">
                {orderData.userData?.email || "your email"}
              </span>
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
