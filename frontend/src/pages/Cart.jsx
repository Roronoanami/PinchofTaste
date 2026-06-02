


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
