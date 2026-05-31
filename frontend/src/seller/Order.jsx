

// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const Order = () => {
//   const { currency, API, user } = useAppContext();
//   const sellerToken = user?.role === "SELLER" ? user.token : null;

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOrders = async () => {
//     if (!sellerToken) return;

//     try {
//       setLoading(true);
//       const res = await fetch(`${API}/seller/orders`, {
//         headers: { Authorization: `Bearer ${sellerToken}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch seller orders error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (orderId, status) => {
//     try {
//       await fetch(`${API}/seller/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sellerToken}`,
//         },
//         body: JSON.stringify({ status }),
//       });

//       fetchOrders();
//     } catch (err) {
//       console.error("Status update error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [sellerToken]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       {/* HEADING */}
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">
//           Orders
//         </p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {loading && <p className="text-gray-500">Loading orders...</p>}

//       {!loading && orders.length === 0 && (
//         <p className="text-gray-500 text-lg">No orders found.</p>
//       )}

//       {!loading &&
//         orders.map((order, index) => {
//           const totalAmount = order.items.reduce(
//             (sum, item) => sum + item.price * item.qty,
//             0
//           );

//           return (
//             <div
//               key={index}
//               className="border border-gray-300 shadow-sm rounded-xl mb-10 p-5 bg-white max-w-4xl"
//             >
//               {/* ORDER HEADER */}
//               <div className="flex justify-between flex-wrap text-gray-700 font-medium mb-4">
//                 <span className="text-sm">
//                   <strong>Order ID:</strong> {order.id || order._id}
//                 </span>
//                 <span className="text-sm">
//                   <strong>Payment:</strong> {order.payment}
//                 </span>
//                 <span className="text-sm">
//                   <strong>Total:</strong> {currency}{totalAmount}
//                 </span>
//               </div>

//               {/* ITEMS */}
//               {order.items.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex flex-col md:flex-row md:items-center justify-between p-5 ${
//                     order.items.length !== idx + 1 ? "border-b" : ""
//                   }`}
//                 >
//                   {/* IMAGE + NAME */}
//                   <div className="flex items-center mb-4 md:mb-0">
//                     <div className="bg-primary/10 p-3 rounded-lg">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-20 h-20 object-cover rounded"
//                       />
//                     </div>

//                     <div className="ml-4">
//                       <h2 className="text-lg font-semibold text-gray-800">
//                         {item.name}
//                       </h2>
//                       <p className="text-sm text-gray-500">
//                         Category: {item.category}
//                       </p>
//                     </div>
//                   </div>

//                   {/* DETAILS */}
//                   <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8">
//                     <p><strong>Qty:</strong> {item.qty}</p>
//                     <p>
//                       <strong>Status:</strong>{" "}
//                       <span className="text-primary font-semibold">
//                         {order.status}
//                       </span>
//                     </p>
//                     <p>
//                       <strong>Date:</strong>{" "}
//                       {new Date(order.createdAt).toLocaleDateString("en-IN")}
//                     </p>
//                     <p className="text-primary font-semibold">
//                       Amount: {currency}{item.price * item.qty}
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               {/* SELLER ACTION BUTTONS */}
//               <div className="mt-4 flex gap-3">
//                 {order.status === "PLACED" && (
//                   <>
//                     <button
//                       onClick={() =>
//                         updateStatus(order.id || order._id, "ACCEPTED")
//                       }
//                       className="px-4 py-2 bg-green-600 text-white rounded"
//                     >
//                       Accept
//                     </button>

//                     <button
//                       onClick={() =>
//                         updateStatus(order.id || order._id, "CANCELLED")
//                       }
//                       className="px-4 py-2 bg-red-600 text-white rounded"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 )}

//                 {order.status === "ACCEPTED" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order.id || order._id, "PREPARING")
//                     }
//                     className="px-4 py-2 bg-yellow-500 text-white rounded"
//                   >
//                     Start Preparing
//                   </button>
//                 )}

//                 {order.status === "PREPARING" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order.id || order._id, "READY")
//                     }
//                     className="px-4 py-2 bg-blue-600 text-white rounded"
//                   >
//                     Mark Ready
//                   </button>
//                 )}

//                 {order.status === "READY" && (
//                   <button
//                     onClick={() =>
//                       updateStatus(order.id || order._id, "COMPLETED")
//                     }
//                     className="px-4 py-2 bg-primary text-white rounded"
//                   >
//                     Complete Order
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default Order;









import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import OrderActionCard from "./OrderActionCard";

const Order = () => {
  const { currency, API, user } = useAppContext();
  const sellerToken = user?.role === "SELLER" ? user.token : null;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    if (!sellerToken) return;

    try {
      setLoading(true);
      const res = await fetch(`${API}/seller/orders`, {
        headers: { Authorization: `Bearer ${sellerToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data || []);
      }
    } catch (err) {
      console.error("Fetch seller orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [sellerToken]);

  return (
    <div className="mt-16 pb-16 px-4 md:px-8">
      {/* HEADING */}
      <div className="flex flex-col items-start mb-9">
        <p className="text-2xl font-semibold uppercase text-gray-800">
          Orders
        </p>
        <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
      </div>

      {loading && <p className="text-gray-500">Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500 text-lg">No orders found.</p>
      )}

      {!loading &&
        orders.map((order, index) => {
          const totalAmount = order.items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
          );

          return (
            <div
              key={order.id || index}
              onClick={() => setSelectedOrder(order)}
              className="cursor-pointer border border-gray-300 shadow-sm rounded-xl mb-10 p-5 bg-white max-w-4xl"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between flex-wrap text-gray-700 font-medium mb-4">
                {order.address && (
               <div className="text-sm text-gray-600 mt-2">
                 <p>
                 <strong>Customer:</strong>{" "}
                  {order.address.firstName} {order.address.lastName}
                   </p>
                        <p>
                                    <strong>Seat:</strong> {order.address.seat || "Not Provided"}

                         </p>
                           </div>
                            )}

                <span className="text-sm">
                  <strong>Order ID:</strong> {order.id || order._id}
                </span>
                <span className="text-sm">
                  <strong>Payment:</strong> {order.payment}
                </span>
                <span className="text-sm text-primary">
                  <strong>Status:</strong> {order.status}
                </span>
              </div>

              {/* ITEMS */}
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row md:items-center justify-between p-5 ${
                    order.items.length !== idx + 1 ? "border-b" : ""
                  }`}
                >
                  {/* IMAGE + NAME */}
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>

                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Category: {item.category}
                      </p>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8">
                    <p><strong>Qty:</strong> {item.qty}</p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </p>
                    <p className="text-primary font-semibold">
                      Amount: {currency}{item.price * item.qty}
                    </p>
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div className="text-right text-primary font-semibold text-lg mt-3">
                Total: {currency}{totalAmount}
              </div>
            </div>
          );
        })}

      {/* ACTION CARD (POPUP) */}
      {selectedOrder && (
        <OrderActionCard
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={fetchOrders}
        />
      )}
    </div>
  );
};

export default Order;
