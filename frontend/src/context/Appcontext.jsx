



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
  // const API = `${window.location.protocol}//${window.location.hostname}:${BACKEND_PORT}/api`;
// const API = import.meta.env.VITE_API_URL || "http://localhost:8080";
// const API = `${API_BASE}/api`;
//   const AUTH_BASE = `${API}/auth`;
//   const CART_BASE = `${API}/cart`;
//   const FOOD_BASE = `${API}/food`;

const API_BASE = import.meta.env.VITE_API_URL;

const API = `${API_BASE}/api`;

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
