


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

//   // Keep token fresh for async calls
//   const tokenRef = useRef(token);
//   useEffect(() => {
//     tokenRef.current = token;
//   }, [token]);

//   // Restore login on refresh
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedEmail = localStorage.getItem("email");

//     if (savedToken && savedEmail) {
//       setUser({ email: savedEmail });
//       setToken(savedToken);
//       tokenRef.current = savedToken;
//     }
//   }, []);

//   // ---------------- BACKEND BASE URLs ----------------
//   const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || "8080";
//   const API = `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT}/api`;

//   const AUTH_BASE = `${API}/auth`;
//   const CART_BASE = `${API}/cart`;
//   const FOOD_BASE = `${API}/food`;

//   // ---------------- PRODUCTS (FOOD LIST) ----------------
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchFoods = async () => {
//       try {
//         const res = await fetch(FOOD_BASE);
//         if (!res.ok) {
//           console.error("Failed to load foods");
//           return;
//         }

//         const data = await res.json();

//         // Normalize ID + category for routing
//         const normalized = (data || []).map((item) => ({
//           ...item,
//           id: item.id || item._id, // ⭐ Mongo _id → id
//           categorySlug: item.category
//             ? item.category.toLowerCase().replace(/\s+/g, "-")
//             : "",
//         }));

//         setProducts(normalized);
//       } catch (err) {
//         console.error("Error fetching foods:", err);
//       }
//     };

//     fetchFoods();
//   }, [FOOD_BASE]);

//   // ---------------- CART (CLIENT STATE) ----------------
//   const initialGuestCart = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("guest_cart")) || {};
//     } catch {
//       return {};
//     }
//   })();

//   const [cartItems, setCartItems] = useState(initialGuestCart);

//   const requireLogin = () => {
//     if (!tokenRef.current) {
//       setShowUserLogin(true);
//       return false;
//     }
//     return true;
//   };

//   const getCartCount = () =>
//     Object.values(cartItems || {}).reduce(
//       (sum, qty) => sum + (Number(qty) || 0),
//       0
//     );

//   const getCartAmount = () => {
//     let total = 0;
//     for (const id in cartItems || {}) {
//       const p = products.find((x) => x.id === id);
//       if (p) {
//         total += (p.offerPrice ?? p.price ?? 0) * (cartItems[id] || 0);
//       }
//     }
//     return total;
//   };

//   // ---------------- CART (BACKEND) ----------------
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
//     } catch (err) {
//       console.warn("fetchCart error", err);
//     }
//   };

//   // On login: sync guest cart → backend cart
//   useEffect(() => {
//     const syncLocalToServer = async () => {
//       if (!tokenRef.current) return;

//       const local = JSON.parse(localStorage.getItem("guest_cart") || "{}");
//       const hasLocal = Object.keys(local).length > 0;

//       if (!hasLocal) {
//         await fetchCart();
//         return;
//       }

//       try {
//         // Get current server state
//         const currentRes = await fetch(CART_BASE, {
//           headers: { Authorization: `Bearer ${tokenRef.current}` },
//         });

//         let serverItems = {};
//         if (currentRes.ok) {
//           const data = await currentRes.json();
//           serverItems = data.items || {};
//         }

//         // For each item in local guest cart, add diff to server
//         for (const id in local) {
//           const localQty = local[id] || 0;
//           const serverQty = serverItems[id] || 0;
//           const toAdd = Math.max(0, localQty - serverQty);

//           for (let i = 0; i < toAdd; i++) {
//             try {
//               const r = await fetch(CART_BASE, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${tokenRef.current}`,
//                 },
//                 body: JSON.stringify({ foodId: id }),
//               });
//               if (!r.ok) break;
//             } catch (e) {
//               console.warn("sync add failed", e);
//               break;
//             }
//           }
//         }

//         await fetchCart();
//         localStorage.removeItem("guest_cart");
//         toast.success("Cart synced after login");
//       } catch (e) {
//         console.warn("syncLocalToServer error", e);
//       }
//     };

//     syncLocalToServer();
//   }, [token, CART_BASE]);

//   // Persist guest cart if user not logged in
//   useEffect(() => {
//     if (!tokenRef.current) {
//       try {
//         localStorage.setItem("guest_cart", JSON.stringify(cartItems || {}));
//       } catch {}
//     }
//   }, [cartItems]);

//   // ---------------- CART ACTIONS ----------------
//   const addToCart = async (productId) => {
//     // Local optimistic update
//     setCartItems((prev) => ({
//       ...(prev || {}),
//       [productId]: (prev?.[productId] || 0) + 1,
//     }));
//     toast.success("Added to cart");

//     if (!tokenRef.current) {
//       // guest-only cart
//       try {
//         const cur = JSON.parse(localStorage.getItem("guest_cart") || "{}");
//         cur[productId] = (cur[productId] || 0) + 1;
//         localStorage.setItem("guest_cart", JSON.stringify(cur));
//       } catch {}
//       return;
//     }

//     // Logged-in: sync to backend
//     try {
//       const res = await fetch(CART_BASE, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tokenRef.current}`,
//         },
//         body: JSON.stringify({ foodId: productId }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setCartItems(data.items || {});
//       } else {
//         await fetchCart();
//       }
//     } catch {
//       toast.error("Network error");
//     }
//   };

//   const removeFromCart = async (productId) => {
//     // Local optimistic update
//     setCartItems((prev) => {
//       const next = { ...(prev || {}) };
//       if (!next[productId]) return next;
//       next[productId] = next[productId] - 1;
//       if (next[productId] <= 0) delete next[productId];
//       return next;
//     });
//     toast.success("Removed from cart");

//     if (!tokenRef.current) {
//       try {
//         const cur = JSON.parse(localStorage.getItem("guest_cart") || "{}");
//         if (cur[productId]) {
//           cur[productId] = cur[productId] - 1;
//           if (cur[productId] <= 0) delete cur[productId];
//           localStorage.setItem("guest_cart", JSON.stringify(cur));
//         }
//       } catch {}
//       return;
//     }

//     // Logged-in: sync to backend
//     try {
//       const res = await fetch(`${CART_BASE}/remove`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${tokenRef.current}`,
//         },
//         body: JSON.stringify({ foodId: productId }),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setCartItems(data.items || {});
//       } else {
//         await fetchCart();
//       }
//     } catch {}
//   };

//   const updateCartItem = async (productId, qty) => {
//     if (qty <= 0) return removeFromCart(productId);

//     // Local update
//     setCartItems((prev) => ({
//       ...(prev || {}),
//       [productId]: qty,
//     }));
//     toast.success("Cart updated");

//     if (!tokenRef.current) {
//       try {
//         const cur = JSON.parse(localStorage.getItem("guest_cart") || "{}");
//         cur[productId] = qty;
//         localStorage.setItem("guest_cart", JSON.stringify(cur));
//       } catch {}
//       return;
//     }

//     // For logged-in, we just re-fetch from backend (since backend doesn't support setting qty directly)
//     try {
//       await fetchCart();
//     } catch {}
//   };

//   const clearCartLocal = () => {
//     setCartItems({});
//     try {
//       localStorage.removeItem("guest_cart");
//     } catch {}
//   };

//   // ---------------- CONTEXT VALUE ----------------
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



// ---------------------  FIXED AppContext ---------------------

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

//   // ---------------- SELLER LOGIN (⭐ REQUIRED FOR SellerLogin.jsx) ----------------
//   const [showSellerLogin, setShowSellerLogin] = useState(false);
//   const [isSeller, setIsSeller] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");

//   const tokenRef = useRef(token);
//   useEffect(() => {
//     tokenRef.current = token;
//   }, [token]);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedEmail = localStorage.getItem("email");

//     if (savedToken && savedEmail) {
//       setUser({ email: savedEmail });
//       setToken(savedToken);
//       tokenRef.current = savedToken;
//     }
//   }, []);

//   // ---------------- DATA ----------------
//   const [products, setProducts] = useState([]);

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

//           const normalized = data.map((item) => ({
//             ...item,
//             id: item.id || item._id,
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

//   // ---------------- CART ----------------
//   const initialGuestCart = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("guest_cart")) || {};
//     } catch {
//       return {};
//     }
//   })();

//   const [cartItems, setCartItems] = useState(initialGuestCart);

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
//     } catch {}
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

//   return (
//     <AppContext.Provider
//       value={{
//         navigate,
//         user,
//         setUser,
//         token,
//         setToken,
//         showUserLogin,
//         setShowUserLogin,

//         // ⭐ REQUIRED FOR SELLER LOGIN
//         showSellerLogin,
//         setShowSellerLogin,
//         isSeller,
//         setIsSeller,

//         requireLogin,
//         products,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateCartItem,
//         clearCartLocal,
//         getCartCount,
//         getCartAmount,

//         currency,
//         searchQuery,
//         setSearchQuery,

//         API,
//         AUTH_BASE,
//         CART_BASE,
//         FOOD_BASE,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);




// import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const currency = import.meta.env.VITE_CURRENCY || "₹";

//   // ---------------- AUTH ----------------
//   const [user, setUser] = useState(null);

//   // CUSTOMER token
//   const [token, setToken] = useState(localStorage.getItem("token") || "");
//   const [showUserLogin, setShowUserLogin] = useState(false);

//   // ---------------- SELLER LOGIN ----------------
//   const [showSellerLogin, setShowSellerLogin] = useState(false);
//   const [isSeller, setIsSeller] = useState(false);

//   // Stores EITHER customer token OR seller token when needed
//   const tokenRef = useRef(token);

//   useEffect(() => {
//     tokenRef.current = token;
//   }, [token]);

//   // Restore CUSTOMER login
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedEmail = localStorage.getItem("email");

//     if (savedToken && savedEmail) {
//       setUser({ email: savedEmail, role: "USER", token: savedToken });
//       setToken(savedToken);
//       tokenRef.current = savedToken;
//     }
//   }, []);

//   // ⭐ Restore SELLER login on page refresh
//   useEffect(() => {
//     const sellerToken = localStorage.getItem("sellerToken");
//     const sellerEmail = localStorage.getItem("sellerEmail");

//     if (sellerToken && sellerEmail) {
//       setIsSeller(true);
//       setUser({ email: sellerEmail, role: "SELLER", token: sellerToken });
//       tokenRef.current = sellerToken;
//     }
//   }, []);

//   // ---------------- DATA ----------------
//   const [products, setProducts] = useState([]);

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

//           const normalized = data.map((item) => ({
//             ...item,
//             id: item.id || item._id,
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

//   // ---------------- CART (CUSTOMER ONLY) ----------------
//   const initialGuestCart = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("guest_cart")) || {};
//     } catch {
//       return {};
//     }
//   })();

//   const [cartItems, setCartItems] = useState(initialGuestCart);

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
//     } catch {}
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

//   return (
//     <AppContext.Provider
//       value={{
//         navigate,
//         user,
//         setUser,
//         token,
//         setToken,
//         showUserLogin,
//         setShowUserLogin,

//         // SELLER
//         showSellerLogin,
//         setShowSellerLogin,
//         isSeller,
//         setIsSeller,

//         requireLogin,
//         products,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateCartItem,
//         clearCartLocal,
//         getCartCount,
//         getCartAmount,

//         currency,
//         searchQuery: "",
//         setSearchQuery: () => {},

//         API,
//         AUTH_BASE,
//         CART_BASE,
//         FOOD_BASE,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => useContext(AppContext);




import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  // ---------------- AUTH ----------------
  const [user, setUser] = useState(null);

  // CUSTOMER token
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showUserLogin, setShowUserLogin] = useState(false);

  // ---------------- SELLER LOGIN ----------------
  const [showSellerLogin, setShowSellerLogin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  // Stores EITHER customer token OR seller token
  const tokenRef = useRef(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // Restore CUSTOMER login
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");

    if (savedToken && savedEmail) {
      setUser({ email: savedEmail, role: "USER", token: savedToken });
      setToken(savedToken);
      tokenRef.current = savedToken;
    }
  }, []);

  // Restore SELLER login
  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerToken");
    const sellerEmail = localStorage.getItem("sellerEmail");

    if (sellerToken && sellerEmail) {
      setIsSeller(true);
      setUser({ email: sellerEmail, role: "SELLER", token: sellerToken });
      tokenRef.current = sellerToken;
    }
  }, []);

  // ---------------- DATA ----------------
  const [products, setProducts] = useState([]);

  const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || "8080";
  const API = `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT}/api`;

  const AUTH_BASE = `${API}/auth`;
  const CART_BASE = `${API}/cart`;
  const FOOD_BASE = `${API}/food`;

  // ---------------- SEARCH FIX ----------------
  const [searchQuery, setSearchQuery] = useState("");

  // ---------------- FETCH FOODS ----------------
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(FOOD_BASE);
        if (res.ok) {
          const data = await res.json();

          const normalized = data.map((item) => ({
            ...item,
            id: item.id || item._id,
            categorySlug: item.category.toLowerCase().replace(/\s+/g, "-"),
          }));

          setProducts(normalized);
        }
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };

    fetchFoods();
  }, []);

  // ---------------- CART ----------------
  const initialGuestCart = (() => {
    try {
      return JSON.parse(localStorage.getItem("guest_cart")) || {};
    } catch {
      return {};
    }
  })();

  const [cartItems, setCartItems] = useState(initialGuestCart);

  const requireLogin = () => {
    if (!tokenRef.current) {
      setShowUserLogin(true);
      return false;
    }
    return true;
  };

  const getCartCount = () =>
    Object.values(cartItems || {}).reduce((a, b) => a + (Number(b) || 0), 0);

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = products.find((p) => p.id === id);
      if (item) total += item.offerPrice * cartItems[id];
    }
    return total;
  };

  const fetchCart = async () => {
    if (!tokenRef.current) return;

    try {
      const res = await fetch(CART_BASE, {
        headers: { Authorization: `Bearer ${tokenRef.current}` },
      });

      if (res.ok) {
        const data = await res.json();
        setCartItems(data.items || {});
      }
    } catch {}
  };

  // Save guest cart
  useEffect(() => {
    if (!tokenRef.current) {
      localStorage.setItem("guest_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ---------------- CART ACTIONS ----------------
  const addToCart = async (id) => {
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    toast.success("Added to cart");

    if (!tokenRef.current) return;

    try {
      const res = await fetch(CART_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenRef.current}`,
        },
        body: JSON.stringify({ foodId: id }),
      });

      if (res.ok) {
        const data = await res.json();
        setCartItems(data.items || {});
      } else fetchCart();
    } catch {}
  };

  const removeFromCart = async (id) => {
    setCartItems((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });

    if (!tokenRef.current) return;

    try {
      const res = await fetch(`${CART_BASE}/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenRef.current}`,
        },
        body: JSON.stringify({ foodId: id }),
      });

      if (res.ok) {
        const data = await res.json();
        setCartItems(data.items || {});
      } else fetchCart();
    } catch {}
  };

  const updateCartItem = async (id, qty) => {
    if (qty <= 0) return removeFromCart(id);

    setCartItems((prev) => ({ ...prev, [id]: qty }));

    if (tokenRef.current) fetchCart();
    else {
      const cur = JSON.parse(localStorage.getItem("guest_cart") || "{}");
      cur[id] = qty;
      localStorage.setItem("guest_cart", JSON.stringify(cur));
    }
  };

  const clearCartLocal = () => {
    setCartItems({});
    localStorage.removeItem("guest_cart");
  };

  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        token,
        setToken,
        showUserLogin,
        setShowUserLogin,

        showSellerLogin,
        setShowSellerLogin,
        isSeller,
        setIsSeller,

        requireLogin,
        products,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCartLocal,
        getCartCount,
        getCartAmount,

        currency,

        // ⭐ REAL WORKING SEARCH STATE
        searchQuery,
        setSearchQuery,

        API,
        AUTH_BASE,
        CART_BASE,
        FOOD_BASE,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
