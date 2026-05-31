// import { useState } from "react";
// import { useAppContext } from "../context/Appcontext";

//     const OrderActionCard = ({ order, onClose, onUpdated }) => {
//   const { API, user } = useAppContext();

//   const orderId = order.id || order._id; // 🔥 FIX

//   const [status, setStatus] = useState(order.status);
//   const [prepTime, setPrepTime] = useState(order.prepTime || "");

//   const updateOrder = async () => {
//     try {
//       console.log("Updating order:", orderId, status, prepTime);

//       const res = await fetch(
//         `${API}/seller/orders/${orderId}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//           body: JSON.stringify({
//             status,
//             prepTime: prepTime ? Number(prepTime) : null,
//           }),
//         }
//       );

//       if (!res.ok) {
//         const err = await res.text();
//         console.error("Update failed:", err);
//         alert("Failed to update order");
//         return;
//       }

//       onUpdated();   // refresh seller orders
//       onClose();     // close popup
//     } catch (err) {
//       console.error("Update error:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white w-[400px] rounded-lg p-6 space-y-4">

//         <h3 className="text-lg font-semibold text-primary">
//           Manage Order
//         </h3>

//         <p className="text-sm text-gray-600">
//           Order ID: {order.id}
//         </p>

//         {/* STATUS */}
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="w-full border rounded px-3 py-2"
//         >
//           <option value="PLACED">PLACED</option>
//           <option value="ACCEPTED">ACCEPTED</option>
//           <option value="PREPARING">PREPARING</option>
//           <option value="READY">READY</option>
//           <option value="COMPLETED">COMPLETED</option>
//         </select>

//         {/* TIMER */}
//         {status === "PREPARING" && (
//           <input
//             type="number"
//             placeholder="Preparation time (minutes)"
//             value={prepTime}
//             onChange={(e) => setPrepTime(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//             min={5}
//             max={60}
//           />
//         )}

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 pt-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={updateOrder}
//             className="px-4 py-2 bg-primary text-white rounded"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderActionCard;











import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";

const OrderActionCard = ({ order, onClose, onUpdated }) => {
  const { API, user } = useAppContext();

  // 🔥 IMPORTANT: resolve correct order id
  const orderId = order.id || order._id;

  const [status, setStatus] = useState(order.status);
  const [prepTime, setPrepTime] = useState(order.prepTime || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateOrder = async () => {
    if (!status) return;

    try {
      setSaving(true);
      setError("");

      const res = await fetch(
        `${API}/seller/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            status,
            prepTime: status === "PREPARING" && prepTime
              ? Number(prepTime)
              : null,
          }),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to update order");
      }

      // ✅ success
      onUpdated();   // refresh seller list
      onClose();     // close popup
    } catch (err) {
      console.error("Order update error:", err);
      setError("Failed to update order. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6 space-y-4 shadow-lg">

        {/* HEADER */}
        <h3 className="text-lg font-semibold text-primary">
          Manage Order
        </h3>

        <p className="text-sm text-gray-600">
          Order ID: <span className="font-medium">{orderId}</span>
        </p>

        {/* STATUS SELECT */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Order Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="PLACED">PLACED</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="PREPARING">PREPARING</option>
            <option value="READY">READY</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        {/* PREP TIME */}
        {status === "PREPARING" && (
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Preparation Time (minutes)
            </label>
            <input
              type="number"
              min={5}
              max={60}
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="5 - 60 minutes"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2 text-gray-600 hover:text-black"
          >
            Cancel
          </button>

          <button
            onClick={updateOrder}
            disabled={saving}
            className="px-5 py-2 bg-primary text-white rounded-lg disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderActionCard;
