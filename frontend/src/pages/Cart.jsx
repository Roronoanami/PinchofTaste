// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/Appcontext";
// import { assets } from "../assets/assets";
// import toast from "react-hot-toast";

// const Cart = () => {
// const {
// products,
// currency,
// cartItems,
// removeFromCart,
// getCartCount,
// updateCartItem,
// navigate,
// getCartAmount,
// requireLogin,
// token,
// API,
// clearCartLocal,
// } = useAppContext();

// const [cartArray, setCartArray] = useState([]);
// const [address, setAddress] = useState({});
// const [showAddress, setShowAddress] = useState(false);
// const [paymentOption, setPaymentOption] = useState("COD");

// // Build UI cart array
// useEffect(() => {
// const arr = [];
// for (const id in cartItems || {}) {
// const product = products.find((item) => item._id === id);
// if (product) arr.push({ ...product, quantity: cartItems[id] });
// }
// setCartArray(arr);
// }, [products, cartItems]);

// // Fetch Address
// useEffect(() => {
// const fetchAddress = async () => {
// if (!token) return;


//   try {
//     const res = await fetch(`${API}/user/address`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.ok) {
//       const data = await res.json();
//       setAddress(data || {});
//     }
//   } catch (err) {
//     console.log("Address fetch failed");
//   }
// };

// fetchAddress();


// }, [token, API]);

// // FINAL FIXED ORDER FUNCTION (COD)
// const placeOrderCOD = async () => {
// try {
// const res = await fetch(`${API}/order/place`, {
// method: "POST",
// headers: {
// "Content-Type": "application/json",
// Authorization: `Bearer ${token}`,
// },
// body: JSON.stringify({
// items: cartArray.map((p) => ({
// foodId: p._id,
// qty: p.quantity,
// })),
// address,
// payment: "COD",
// }),
// });

//   if (!res.ok) {
//     const msg = await res.text().catch(() => "Order failed");
//     toast.error("Order failed: " + msg);
//     return false;
//   }

//   toast.success("Order placed 🎉");

//   // Clear cart
//   clearCartLocal && clearCartLocal();

//   // Redirect
//   navigate("/my-order");
//   return true;
// } catch (err) {
//   toast.error("Network error");
//   return false;
// }


// };

// return ( <div className="flex flex-col md:flex-row mt-16">
// {/* LEFT SIDE */} <div className="flex-1 max-w-4xl"> <h1 className="text-3xl font-medium mb-6">
// Shopping Cart{" "} <span className="text-sm text-primary">({getCartCount()})</span> </h1>

//     <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
//       <p>Food Details</p>
//       <p className="text-center">Subtotal</p>
//       <p className="text-center">Action</p>
//     </div>

//     {cartArray.map((product) => (
//       <div
//         key={product._id}
//         className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
//       >
//         <div className="flex items-center md:gap-6 gap-3">
//           {/* Image */}
//           <div
//             onClick={() => {
//               navigate(
//                 `/products/${product.category.toLowerCase()}/${product._id}`
//               );
//               scrollTo(0, 0);
//             }}
//             className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
//           >
//             <img
//               className="max-w-full h-full object-cover"
//               src={product.image?.[0] || ""}
//               alt={product.name}
//             />
//           </div>

//           {/* Details */}
//           <div>
//             <p className="hidden md:block font-semibold">{product.name}</p>

//             <div className="font-normal text-gray-500">
//               <p>
//                 Portion: <span>{product.portion || "N/A"}</span>
//               </p>

//               <div className="flex text-black items-center">
//                 <p>Qty:&nbsp;</p>
//                 <select
//                   value={product.quantity}
//                   onChange={(e) =>
//                     updateCartItem &&
//                     updateCartItem(product._id, Number(e.target.value))
//                   }
//                   className="outline-none text-primary"
//                 >
//                   {Array.from({
//                     length: Math.max(product.quantity, 9),
//                   }).map((_, i) => (
//                     <option key={i} value={i + 1}>
//                       {i + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Price */}
//         <p className="text-center">
//           {currency} {product.offerPrice * product.quantity}
//         </p>

//         {/* Remove */}
//         <button
//           onClick={() => removeFromCart(product._id)}
//           className="cursor-pointer mx-auto"
//         >
//           <img className="h-3" src={assets.refresh_icon} alt="remove" />
//         </button>
//       </div>
//     ))}

//     <button
//       onClick={() => {
//         navigate("/products");
//         scrollTo(0, 0);
//       }}
//       className="group cursor-pointer flex items-center mt-8 gap-2 text-primary/70 font-medium"
//     >
//       <img
//         className="h-4 w-4"
//         src={assets.arrow_right_icon_colored}
//         alt="arrow"
//       />
//       Continue Shopping
//     </button>
//   </div>

//   {/* RIGHT SIDE */}
//   <div className="max-w-[360px] w-full bg-white p-6 shadow-md rounded-md border border-gray-200 max-md:mt-12">
//     <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
//     <hr className="border-gray-300 my-5" />

//     {/* Address */}
//     <div className="mb-6">
//       <p className="text-sm font-medium uppercase text-gray-600">
//         Order Place At
//       </p>

//       <div className="relative flex justify-between items-start mt-2">
//         {address?.firstName ? (
//           <div className="text-gray-600 space-y-0.5">
//             <p>
//               {address.firstName} {address.lastName}
//             </p>
//             <p>{address.email}</p>
//             <p>{address.phono}</p>
//             <p>{address.place}</p>
//           </div>
//         ) : (
//           <p className="text-gray-500 text-sm">No Address Found</p>
//         )}

//         <button
//           onClick={() => setShowAddress(!showAddress)}
//           className="text-primary hover:underline cursor-pointer ml-4 text-sm"
//         >
//           Change
//         </button>

//         {showAddress && (
//           <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 shadow-md rounded-md p-3 z-50">
//             <div
//               onClick={() => {
//                 navigate("/add-detail");
//                 setShowAddress(false);
//               }}
//               className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10 rounded text-sm"
//             >
//               Update Details
//             </div>
//           </div>
//         )}
//       </div>
//     </div>

//     {/* Payment */}
//     <p className="text-sm font-medium uppercase text-gray-600 mt-6">
//       Payment Method
//     </p>

//     <select
//       value={paymentOption}
//       onChange={(e) => setPaymentOption(e.target.value)}
//       className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 rounded-md outline-none"
//     >
//       <option value="COD">Cash On Delivery</option>
//       <option value="Online">Online Payment</option>
//     </select>

//     <hr className="border-gray-300 my-5" />

//     {/* Summary */}
//     <div className="text-gray-700 mt-4 space-y-2 text-sm">
//       <p className="flex justify-between">
//         <span>Price</span>
//         <span>
//           {currency} {getCartAmount()}
//         </span>
//       </p>

//       <p className="flex justify-between">
//         <span>Restaurant Charges</span>
//         <span>{currency}11</span>
//       </p>

//       <p className="flex justify-between">
//         <span>Tax (12%)</span>
//         <span>
//           {currency} {(getCartAmount() * 12) / 100}
//         </span>
//       </p>

//       <p className="flex justify-between">
//         <span>Platform Fee</span>
//         <span>{currency}12</span>
//       </p>

//       <p className="flex justify-between text-lg font-semibold mt-4">
//         <span>Total Amount:</span>
//         <span>
//           {currency}{" "}
//           {Math.floor(
//             getCartAmount() + (getCartAmount() * 12) / 100 + 12
//           )}
//         </span>
//       </p>
//     </div>

//     {/* PLACE ORDER */}
//     <button
//       onClick={async () => {
//         if (!requireLogin()) return;

//         if (!address?.firstName) {
//           toast.error("Please add your delivery address.");
//           navigate("/add-detail");
//           return;
//         }

//         if (paymentOption === "COD") {
//           await placeOrderCOD();
//           return;
//         }

//         navigate("/checkout");
//       }}
//       className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary/80 rounded-md transition"
//     >
//       {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
//     </button>
//   </div>
// </div>

// );
// };

// export default Cart;


// import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const currency = import.meta.env.VITE_CURRENCY || "₹";

//   // ---------------- AUTH ----------------
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [showUserLogin, setShowUserLogin] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");

//   // tokenRef to avoid stale token in async calls
//   const tokenRef = useRef(token);
//   useEffect(() => {
//     tokenRef.current = token;
//   }, [token]);

//   // Restore login state if page refresh
//   useEffect(() => {
//     const t = localStorage.getItem("token");
//     const email = localStorage.getItem("email");

//     if (t && email) {
//       setUser({ email });
//       setToken(t);
//       tokenRef.current = t;
//     }
//   }, []);

//   // ---------------- DATA ----------------
//   const [products, setProducts] = useState([]);

//   // guest cart
//   const initialGuestCart = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("guest_cart")) || {};
//     } catch {
//       return {};
//     }
//   })();

//   const [cartItems, setCartItems] = useState(initialGuestCart);

//   // Backend URLs
//   const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || "8080";
//   const API = `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT}/api`;

//   const AUTH_BASE = `${API}/auth`;
//   const CART_BASE = `${API}/cart`;
//   const FOOD_BASE = `${API}/food`;

//   // ---------------- FETCH FOODS ----------------
//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const res = await fetch(FOOD_BASE);

//         if (res.ok) {
//           const data = await res.json();

//           // Normalize category for routing
//           const normalized = data.map((item) => ({
//             ...item,
//             categorySlug: item.category.toLowerCase().replace(/\s+/g, "-"),
//           }));

//           setProducts(normalized);
//         }
//       } catch (err) {
//         console.error("Error fetching foods:", err);
//       }
//     };

//     fetchFoods();
//   }, []);

//   // ---------------- HELPERS ----------------
//   const requireLogin = () => {
//     if (!tokenRef.current) {
//       setShowUserLogin(true);
//       return false;
//     }
//     return true;
//   };

//   const getCartCount = () =>
//     Object.values(cartItems || {}).reduce((a, b) => a + (Number(b) || 0), 0);

//   const getCartAmount = () => {
//     let total = 0;

//     for (const id in cartItems) {
//       const item = products.find((p) => p.id === id);
//       if (item) total += item.offerPrice * cartItems[id];
//     }

//     return total;
//   };

//   // ---------------- CART SYNC ----------------
//   const fetchCart = async () => {
//     if (!tokenRef.current) return;

//     try {
//       const res = await fetch(CART_BASE, {
//         headers: { Authorization: `Bearer ${tokenRef.current}` },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setCartItems(data.items || {});
//       }
//     } catch {}
//   };

//   // Sync guest → server after login
//   useEffect(() => {
//     const syncLocalToServer = async () => {
//       if (!tokenRef.current) return;

//       const local = JSON.parse(localStorage.getItem("guest_cart") || "{}");
//       const hasLocal = Object.keys(local).length > 0;

//       if (!hasLocal) return fetchCart();

//       try {
//         const currentRes = await fetch(CART_BASE, {
//           headers: { Authorization: `Bearer ${tokenRef.current}` },
//         });

//         let serverItems = {};
//         if (currentRes.ok) {
//           const data = await currentRes.json();
//           serverItems = data.items || {};
//         }

//         for (const id in local) {
//           const diff = local[id] - (serverItems[id] || 0);
//           if (diff <= 0) continue;

//           for (let i = 0; i < diff; i++) {
//             await fetch(CART_BASE, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${tokenRef.current}`,
//               },
//               body: JSON.stringify({ foodId: id }),
//             });
//           }
//         }

//         await fetchCart();
//         localStorage.removeItem("guest_cart");
//         toast.success("Cart synced after login");
//       } catch (err) {
//         console.warn("cart sync failed", err);
//       }
//     };

//     syncLocalToServer();
//   }, [token]);

//   // Save guest cart
//   useEffect(() => {
//     if (!tokenRef.current) {
//       localStorage.setItem("guest_cart", JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   // ---------------- CART ACTIONS ----------------
//   const addToCart = async (id) => {
//     setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
//     toast.success("Added to cart");

//     if (!tokenRef.current) return;

//     try {
//       const res = await fetch(CART_BASE, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tokenRef.current}`,
//         },
//         body: JSON.stringify({ foodId: id }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setCartItems(data.items || {});
//       } else fetchCart();
//     } catch {
//       toast.error("Network error");
//     }
//   };

//   const removeFromCart = async (id) => {
//     setCartItems((prev) => {
//       const next = { ...prev };
//       if (next[id] > 1) next[id]--;
//       else delete next[id];
//       return next;
//     });

//     if (!tokenRef.current) return;

//     try {
//       const res = await fetch(`${CART_BASE}/remove`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tokenRef.current}`,
//         },
//         body: JSON.stringify({ foodId: id }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setCartItems(data.items || {});
//       } else fetchCart();
//     } catch {}
//   };

//   const updateCartItem = async (id, qty) => {
//     if (qty <= 0) return removeFromCart(id);

//     setCartItems((prev) => ({ ...prev, [id]: qty }));

//     if (tokenRef.current) fetchCart();
//     else {
//       const cur = JSON.parse(localStorage.getItem("guest_cart") || "{}");
//       cur[id] = qty;
//       localStorage.setItem("guest_cart", JSON.stringify(cur));
//     }
//   };

//   const clearCartLocal = () => {
//     setCartItems({});
//     localStorage.removeItem("guest_cart");
//   };

//   // ---------------- EXPORT ----------------
//   const value = {
//     navigate,
//     user,
//     setUser,
//     token,
//     setToken,
//     showUserLogin,
//     setShowUserLogin,

//     requireLogin,
//     products,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateCartItem,
//     clearCartLocal,
//     getCartCount,
//     getCartAmount,

//     currency,
//     searchQuery,
//     setSearchQuery,

//     API,
//     AUTH_BASE,
//     CART_BASE,
//     FOOD_BASE,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);



import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    requireLogin,
    token,
    API,
    clearCartLocal,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState({});
  const [showAddress, setShowAddress] = useState(false);
  const [paymentOption, setPaymentOption] = useState("COD");

  // ⭐ Build proper cart array AFTER foods + cart items load
  useEffect(() => {
    if (!products.length) return;

    const arr = Object.entries(cartItems).map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;

      return {
        ...product,
        quantity: qty,
      };
    });

    setCartArray(arr.filter(Boolean));
  }, [products, cartItems]);

  // ⭐ Fetch Address
  useEffect(() => {
    const fetchAddress = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API}/user/address`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setAddress(await res.json());
      } catch {}
    };
    fetchAddress();
  }, [token, API]);

  // ⭐ Place Order (COD)
  const placeOrderCOD = async () => {
    try {
      const res = await fetch(`${API}/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartArray.map((p) => ({
            foodId: p.id,
            qty: p.quantity,
          })),
          address,
          payment: "COD",
        }),
      });

      if (!res.ok) return toast.error("Order failed");

      toast.success("Order placed 🎉");

      clearCartLocal();
      navigate("/my-order");
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* LEFT SIDE */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">({getCartCount()})</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p>Food Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              {/* Image */}
              <div
                onClick={() => {
                  navigate(`/products/${product.categorySlug}/${product.id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>

              {/* Details */}
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500">
                  <p>
                    Portion: <span>{product.portion || "N/A"}</span>
                  </p>

                  <div className="flex text-black items-center">
                    <p>Qty:&nbsp;</p>
                    <select
                      value={product.quantity}
                      onChange={(e) =>
                        updateCartItem(product.id, Number(e.target.value))
                      }
                      className="outline-none text-primary"
                    >
                      {Array.from({ length: Math.max(product.quantity, 9) }).map(
                        (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(product.id)}
              className="cursor-pointer mx-auto"
            >
              <img className="h-3" src={assets.refresh_icon} alt="remove" />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary/70 font-medium"
        >
          <img
            className="h-4 w-4"
            src={assets.arrow_right_icon_colored}
            alt="arrow"
          />
          Continue Shopping
        </button>
      </div>

      {/* RIGHT SIDE — unchanged UI */}
      <div className="max-w-[360px] w-full bg-white p-6 shadow-md rounded-md border border-gray-200 max-md:mt-12">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

        <hr className="border-gray-300 my-5" />

        {/* Address */}
        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-gray-600">
            Order Place At
          </p>

          <div className="relative flex justify-between items-start mt-2">
            {address?.firstName ? (
              <div className="text-gray-600 space-y-0.5">
                <p>
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.email}</p>
                <p>{address.phono}</p>
                <p>{address.place}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No Address Found</p>
            )}

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer ml-4 text-sm"
            >
              Change
            </button>

            {showAddress && (
              <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 shadow-md rounded-md p-3 z-50">
                <div
                  onClick={() => {
                    navigate("/add-detail");
                    setShowAddress(false);
                  }}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10 rounded text-sm"
                >
                  Update Details
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment */}
        <p className="text-sm font-medium uppercase text-gray-600 mt-6">
          Payment Method
        </p>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 rounded-md outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="border-gray-300 my-5" />

        {/* Totals */}
        <div className="text-gray-700 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Restaurant Charges</span>
            <span>{currency}11</span>
          </p>

          <p className="flex justify-between">
            <span>Tax (12%)</span>
            <span>
              {currency}
              {(getCartAmount() * 12) / 100}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Platform Fee</span>
            <span>{currency}12</span>
          </p>

          <p className="flex justify-between text-lg font-semibold mt-4">
            <span>Total Amount:</span>
            <span>
              {currency}
              {Math.floor(
                getCartAmount() + (getCartAmount() * 12) / 100 + 12
              )}
            </span>
          </p>
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={async () => {
            if (!requireLogin()) return;

            if (!address?.firstName) {
              toast.error("Please add your delivery address.");
              navigate("/add-detail");
              return;
            }

            if (paymentOption === "COD") return placeOrderCOD();

            navigate("/checkout");
          }}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary/80 rounded-md transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
