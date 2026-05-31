

// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const MyOrder = () => {
//   const { currency, token, API, products } = useAppContext();

//   const [myOrders, setMyOrders] = useState([]);

//   // Find product details using foodId
//   const getProduct = (id) => products.find((p) => p._id === id);

//   // Fetch logged-in user's orders
//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">
//           My Orders
//         </p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {myOrders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         myOrders.map((order, index) => {
//           // Total amount for this order
//           const totalAmount = order.items.reduce((sum, item) => {
//             const product = getProduct(item.foodId);
//             return product ? sum + product.offerPrice * item.qty : sum;
//           }, 0);

//           return (
//             <div
//               key={index}
//               className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
//             >
//               <p className="flex justify-between flex-wrap text-gray-600 font-medium mb-3">
//                 <span>Order ID: {order.id}</span>
//                 <span>Payment: {order.payment}</span>
//                 <span>
//                   Total: {currency}
//                   {totalAmount}
//                 </span>
//               </p>

//               {order.items.map((item, idx) => {
//                 const product = getProduct(item.foodId);
//                 if (!product) return null;

//                 return (
//                   <div
//                     key={idx}
//                     className={`bg-white text-gray-500/70 p-5 py-6 flex flex-col md:flex-row md:items-center justify-between ${
//                       order.items.length !== idx + 1 ? "border-b" : ""
//                     }`}
//                   >
//                     {/* Product Image + Name */}
//                     <div className="flex items-center mb-3">
//                       <div className="bg-primary/10 p-3 rounded-lg">
//                         <img
//                           src={product.image?.[0]}
//                           alt={product.name}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <h2 className="text-lg font-semibold text-gray-800">
//                           {product.name} {/* ❤️ FOOD NAME */}
//                         </h2>
//                         <p className="text-sm text-gray-500">
//                           Category: {product.category}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Item Details */}
//                     <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8 mb-4 md:mb-0">
//                       <p>Quantity: {item.qty}</p>
//                       <p>Status: {order.status}</p>
//                       <p>
//                         Date:{" "}
//                         {new Date(order.createdAt).toLocaleDateString("en-IN")}
//                       </p>
//                       <p className="text-primary font-medium">
//                         Amount: {currency}
//                         {product.offerPrice * item.qty}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MyOrder;


// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const MyOrder = () => {
//   const { currency, token, API, products } = useAppContext();

//   const [myOrders, setMyOrders] = useState([]);

//   // Find product details using foodId
//   const getProduct = (id) => products.find((p) => p._id === id);

//   // Fetch logged-in user's orders
//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">
//           My Orders
//         </p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {myOrders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         myOrders.map((order, index) => {
//           // Total amount for this order
//           const totalAmount = order.items.reduce((sum, item) => {
//             const product = getProduct(item.foodId); // ✔ FIXED
//             return product ? sum + product.offerPrice * item.qty : sum;
//           }, 0);

//           return (
//             <div
//               key={index}
//               className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
//             >
//               <p className="flex justify-between flex-wrap text-gray-600 font-medium mb-3">
//                 <span>Order ID: {order.id || order._id}</span>
//                 <span>Payment: {order.payment}</span>
//                 <span>
//                   Total: {currency}
//                   {totalAmount}
//                 </span>
//               </p>

//               {order.items.map((item, idx) => {
//                 const product = getProduct(item.foodId); // ✔ FIXED
//                 if (!product) return null;

//                 return (
//                   <div
//                     key={idx}
//                     className={`bg-white text-gray-500/70 p-5 py-6 flex flex-col md:flex-row md:items-center justify-between ${
//                       order.items.length !== idx + 1 ? "border-b" : ""
//                     }`}
//                   >
//                     {/* Product Image + Name */}
//                     <div className="flex items-center mb-3">
//                       <div className="bg-primary/10 p-3 rounded-lg">
//                         <img
//                           src={product.image?.[0]}
//                           alt={product.name}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <h2 className="text-lg font-semibold text-gray-800">
//                           {product.name}
//                         </h2>
//                         <p className="text-sm text-gray-500">
//                           Category: {product.category}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Item Details */}
//                     <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8 mb-4 md:mb-0">
//                       <p>Quantity: {item.qty}</p>
//                       <p>Status: {order.status}</p>
//                       <p>
//                         Date:{" "}
//                         {new Date(order.createdAt).toLocaleDateString("en-IN")}
//                       </p>
//                       <p className="text-primary font-medium">
//                         Amount: {currency}
//                         {product.offerPrice * item.qty}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MyOrder;




// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const MyOrder = () => {
//   const { currency, token, API } = useAppContext();

//   const [myOrders, setMyOrders] = useState([]);

//   // Fetch logged-in user's orders
//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">
//           My Orders
//         </p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {myOrders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         myOrders.map((order, index) => {
//           // Compute total using snapshot price
//           const totalAmount = order.items.reduce(
//             (sum, item) => sum + item.price * item.qty,
//             0
//           );

//           return (
//             <div
//               key={index}
//               className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
//             >
//               <p className="flex justify-between flex-wrap text-gray-600 font-medium mb-3">
//                 <span>Order ID: {order.id || order._id}</span>
//                 <span>Payment: {order.payment}</span>
//                 <span>
//                   Total: {currency}
//                   {totalAmount}
//                 </span>
//               </p>

//               {order.items.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className={`bg-white text-gray-500/70 p-5 py-6 flex flex-col md:flex-row md:items-center justify-between ${
//                     order.items.length !== idx + 1 ? "border-b" : ""
//                   }`}
//                 >
//                   {/* Product Image + Name */}
//                   <div className="flex items-center mb-3">
//                     <div className="bg-primary/10 p-3 rounded-lg">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
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

//                   {/* Item Details */}
//                   <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8 mb-4 md:mb-0">
//                     <p>Quantity: {item.qty}</p>
//                     <p>Status: {order.status}</p>
//                     <p>
//                       Date:{" "}
//                       {new Date(order.createdAt).toLocaleDateString("en-IN")}
//                     </p>
//                     <p className="text-primary font-medium">
//                       Amount: {currency}
//                       {item.price * item.qty}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MyOrder;



// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const MyOrder = () => {
//   const { currency, token, API } = useAppContext();
//   const [myOrders, setMyOrders] = useState([]);

//   // Fetch orders
//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Order fetch error", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">My Orders</p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {myOrders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         myOrders.map((order, index) => {
//           const total = order.items.reduce(
//             (sum, item) => sum + item.price * item.qty,
//             0
//           );

//           return (
//             <div
//               key={index}
//               className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
//             >
//               <p className="flex justify-between flex-wrap text-gray-600 font-medium mb-3">
//                 <span>Order ID: {order.id || order._id}</span>
//                 <span>Payment: {order.payment}</span>
//                 <span>Total: {currency}{total}</span>
//               </p>

//               {order.items.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className={`bg-white text-gray-500/70 p-5 py-6 flex flex-col md:flex-row md:items-center justify-between ${
//                     order.items.length !== idx + 1 ? "border-b" : ""
//                   }`}
//                 >
//                   {/* Image + title */}
//                   <div className="flex items-center mb-3">
//                     <div className="bg-primary/10 p-3 rounded-lg">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     </div>

//                     <div className="ml-4">
//                       <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//                       <p className="text-sm text-gray-500">Category: {item.category}</p>
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8 mb-4 md:mb-0">
//                     <p>Quantity: {item.qty}</p>
//                     <p>Status: {order.status}</p>
//                     <p>Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
//                     <p className="text-primary font-medium">
//                       Amount: {currency}{item.price * item.qty}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MyOrder;



// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const MyOrder = () => {
//   const { currency, token, API } = useAppContext();
//   const [myOrders, setMyOrders] = useState([]);

//   // Fetch logged-in user's orders
//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">
//           My Orders
//         </p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {myOrders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         myOrders.map((order, index) => {
//           // Calculate total from snapshot fields
//           const totalAmount = order.items.reduce(
//             (sum, item) => sum + item.price * item.qty,
//             0
//           );

//           return (
//             <div
//               key={index}
//               className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
//             >
//               <p className="flex justify-between flex-wrap text-gray-600 font-medium mb-3">
//                 <span>Order ID: {order.id || order._id}</span>
//                 <span>Payment: {order.payment}</span>
//                 <span>
//                   Total: {currency}
//                   {totalAmount}
//                 </span>
//               </p>

//               {order.items.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className={`bg-white text-gray-500/70 p-5 py-6 flex flex-col md:flex-row md:items-center justify-between ${
//                     order.items.length !== idx + 1 ? "border-b" : ""
//                   }`}
//                 >
//                   {/* Product Image + Name (Using snapshot fields) */}
//                   <div className="flex items-center mb-3">
//                     <div className="bg-primary/10 p-3 rounded-lg">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
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

//                   {/* Item Details */}
//                   <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8 mb-4 md:mb-0">
//                     <p>Quantity: {item.qty}</p>
//                     <p>Status: {order.status}</p>
//                     <p>
//                       Date:{" "}
//                       {new Date(order.createdAt).toLocaleDateString("en-IN")}
//                     </p>
//                     <p className="text-primary font-medium">
//                       Amount: {currency}
//                       {item.price * item.qty}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MyOrder;


// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const MyOrder = () => {
//   const { currency, token, API } = useAppContext();

//   const [myOrders, setMyOrders] = useState([]);

//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">My Orders</p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {myOrders.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         myOrders.map((order, idx) => {
//           const totalAmount = order.items.reduce(
//             (sum, i) => sum + i.price * i.qty,
//             0
//           );

//           return (
//             <div
//               key={idx}
//               className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
//             >
//               <p className="flex justify-between flex-wrap text-gray-600 font-medium mb-3">
//                 <span>Order ID: {order.id || order._id}</span>
//                 <span>Payment: {order.payment}</span>
//                 <span>Total: {currency}{totalAmount}</span>
//               </p>

//               {order.items.map((item, i) => (
//                 <div
//                   key={i}
//                   className={`bg-white text-gray-500/70 p-5 py-6 flex flex-col md:flex-row md:items-center justify-between ${
//                     order.items.length !== i + 1 ? "border-b" : ""
//                   }`}
//                 >
//                   {/* IMAGE + NAME */}
//                   <div className="flex items-center mb-3">
//                     <div className="bg-primary/10 p-3 rounded-lg">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     </div>
//                     <div className="ml-4">
//                       <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
//                       <p className="text-sm text-gray-500">Category: {item.category}</p>
//                     </div>
//                   </div>

//                   {/* DETAILS */}
//                   <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8 mb-4 md:mb-0">
//                     <p>Quantity: {item.qty}</p>
//                     <p>Status: {order.status}</p>
//                     <p>Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}</p>

//                     <p className="text-primary font-medium">
//                       Amount: {currency}{item.price * item.qty}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MyOrder;



// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";

// const MyOrder = () => {
//   const { currency, token, API } = useAppContext();

//   const [myOrders, setMyOrders] = useState([]);

//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <div className="mt-16 pb-16 px-4 md:px-8">
//       {/* HEADING */}
//       <div className="flex flex-col items-start mb-9">
//         <p className="text-2xl font-semibold uppercase text-gray-800">
//           My Orders
//         </p>
//         <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//       </div>

//       {/* EMPTY STATE */}
//       {myOrders.length === 0 ? (
//         <p className="text-gray-500 text-lg">No orders found.</p>
//       ) : (
//         myOrders.map((order, index) => {
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
//                         src={item.imageUrl || ""}
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
//                     <p>
//                       <strong>Qty:</strong> {item.qty}
//                     </p>
//                     <p>
//                       <strong>Status:</strong> {order.status}
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
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default MyOrder;




// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";
// import CustumerOrderStatusCard from "../components/CustumerOrderStatusCard";


// const MyOrder = () => {
//   const { currency, token, API } = useAppContext();

//   const [myOrders, setMyOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const fetchMyOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await fetch(`${API}/order/my-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setMyOrders(data || []);
//       }
//     } catch (err) {
//       console.error("Fetch orders error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, [token]);

//   return (
//     <>
//       <div className="mt-16 pb-16 px-4 md:px-8">
//         {/* HEADING */}
//         <div className="flex flex-col items-start mb-9">
//           <p className="text-2xl font-semibold uppercase text-gray-800">
//             My Orders
//           </p>
//           <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
//         </div>

//         {/* EMPTY STATE */}
//         {myOrders.length === 0 ? (
//           <p className="text-gray-500 text-lg">No orders found.</p>
//         ) : (
//           myOrders.map((order, index) => {
//             const totalAmount = order.items.reduce(
//               (sum, item) => sum + item.price * item.qty,
//               0
//             );

//             return (
//               <div
//                 key={index}
//                 onClick={() => setSelectedOrder(order)}
//                 className="cursor-pointer border border-gray-300 shadow-sm rounded-xl mb-10 p-5 bg-white max-w-4xl hover:border-primary"
//               >
//                 {/* ORDER HEADER */}
//                 <div className="flex justify-between flex-wrap text-gray-700 font-medium mb-4">
//                   <span className="text-sm">
//                     <strong>Order ID:</strong> {order.id || order._id}
//                   </span>
//                   <span className="text-sm">
//                     <strong>Payment:</strong> {order.payment}
//                   </span>
//                   <span className="text-sm">
//                     <strong>Total:</strong> {currency}{totalAmount}
//                   </span>
//                 </div>

//                 {/* ITEMS */}
//                 {order.items.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex flex-col md:flex-row md:items-center justify-between p-5 ${
//                       order.items.length !== idx + 1 ? "border-b" : ""
//                     }`}
//                   >
//                     {/* IMAGE + NAME */}
//                     <div className="flex items-center mb-4 md:mb-0">
//                       <div className="bg-primary/10 p-3 rounded-lg">
//                         <img
//                           src={item.imageUrl || ""}
//                           alt={item.name}
//                           className="w-20 h-20 object-cover rounded"
//                         />
//                       </div>

//                       <div className="ml-4">
//                         <h2 className="text-lg font-semibold text-gray-800">
//                           {item.name}
//                         </h2>
//                         <p className="text-sm text-gray-500">
//                           Category: {item.category}
//                         </p>
//                       </div>
//                     </div>

//                     {/* DETAILS */}
//                     <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8">
//                       <p><strong>Qty:</strong> {item.qty}</p>
//                       <p><strong>Status:</strong> {order.status}</p>
//                       <p>
//                         <strong>Date:</strong>{" "}
//                         {new Date(order.createdAt).toLocaleDateString("en-IN")}
//                       </p>
//                       <p className="text-primary font-semibold">
//                         Amount: {currency}{item.price * item.qty}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* STATUS CARD POPUP */}
//       {selectedOrder && (
//         <CustomerOrderStatusCard
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)}
//         />
//       )}
//     </>
//   );
// };

// export default MyOrder;




import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import CustumerOrderStatusCard from "../components/CustumerOrderStatusCard";

const MyOrder = () => {
  const { currency, token, API } = useAppContext();

  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchMyOrders = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${API}/order/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setMyOrders(data || []);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [token]);

  return (
    <>
      <div className="mt-16 pb-16 px-4 md:px-8">
        {/* HEADING */}
        <div className="flex flex-col items-start mb-9">
          <p className="text-2xl font-semibold uppercase text-gray-800">
            My Orders
          </p>
          <div className="w-16 h-[2px] bg-primary rounded-full mt-1"></div>
        </div>

        {/* EMPTY STATE */}
        {myOrders.length === 0 ? (
          <p className="text-gray-500 text-lg">No orders found.</p>
        ) : (
          myOrders.map((order, index) => {
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
                {/* HEADER */}
                <div className="flex justify-between flex-wrap text-gray-700 font-medium mb-4">
                  <span className="text-sm">
                    <strong>Order ID:</strong> {order.id || order._id}
                  </span>
                  <span className="text-sm">
                    <strong>Payment:</strong> {order.payment}
                  </span>
                  <span className="text-sm">
                    <strong>Total:</strong> {currency}{totalAmount}
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
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <img
                          src={item.imageUrl || ""}
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

                    <div className="flex flex-col text-sm text-primary/80 space-y-1 md:ml-8">
                      <p><strong>Qty:</strong> {item.qty}</p>
                      <p><strong>Status:</strong> {order.status}</p>
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
              </div>
            );
          })
        )}
      </div>

      {/* POPUP CARD */}
      {selectedOrder && (
        <CustumerOrderStatusCard
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};

export default MyOrder;
