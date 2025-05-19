import React, { useEffect, useState } from "react";
import API from "../../api";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setError(null);
      const response = await API.get("/orders");
      setOrders(
        Array.isArray(response.data.orders) ? response.data.orders : []
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setError(null);
      setUpdatingOrder(orderId);
      await API.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Failed to update order status");
    } finally {
      setUpdatingOrder(null);
    }
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalItems = orders.reduce(
    (sum, order) =>
      sum +
      (order.items?.reduce(
        (itemSum, item) => itemSum + (item.quantity || 0),
        0
      ) || 0),
    0
  );
  const totalAmount = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 text-red-500 text-center p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Items</h3>
          <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Amount</h3>
          <p className="text-3xl font-bold text-gray-900">₹{totalAmount}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-900">
                  Order ID
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-900">
                  First Name
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-900">
                  Items
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-900">
                  Total
                </th>
                <th className="py-3 px-4 border-b text-left text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 1 ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="py-3 px-4 border-b text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-900">
                    {order.firstName || "N/A"}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-900">
                    {order.items?.reduce(
                      (sum, item) => sum + (item.quantity || 0),
                      0
                    ) || 0}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-900">
                    ₹{order.total || 0}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-900">
                    <span
                      className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "preparing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "on-the-way"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status?.replace("-", " ") || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
