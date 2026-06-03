

import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLogin = () => {

      const {
  showSellerLogin,
  setShowSellerLogin,
  setUser,
  setIsSeller,
  API,
} = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const closeModal = () => {
    setShowSellerLogin(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
     const res = await fetch(`${API}/seller/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
 
      if (!res.ok) {
        const msg = await res.text();
        toast.error("Login failed: " + msg);
        return;
      }

      const data = await res.json(); // { email, role, token }

                              // save seller as main logged-in user
const sellerUser = {
  email: data.email,
  role: data.role,
  token: data.token
};

setUser(sellerUser);
setIsSeller(true);

localStorage.setItem("sellerToken", data.token);
localStorage.setItem("sellerEmail", data.email);

      toast.success("Seller logged in!");

      closeModal();

      // ⬅️ VERY IMPORTANT: Go to /seller (this loads SellerLayout)
      navigate("/seller");
    } catch (err) {
      toast.error("Network error");
      console.error("Seller login error:", err);
    }
  };

  // Only show on /seller route
  if (location.pathname !== "/seller") return null;
  if (!showSellerLogin) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
      <div className="relative p-[2px] rounded-lg border-glow-multi">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="seller@example.com"
              className="border border-gray-200 rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>

          <div className="w-full relative">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 pr-10"
              type={showPassword ? "text" : "password"}
              required
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-primary/70 hover:bg-primary text-white w-full py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
