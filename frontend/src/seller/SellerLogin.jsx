// import React, { useState } from "react";
// import { useAppContext } from "../context/Appcontext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const SellerLogin = () => {
//   const { showSellerLogin, setShowSellerLogin, setUser } = useAppContext();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const closeModal = () => {
//     if (typeof setShowSellerLogin === "function") setShowSellerLogin(false);
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();

//     const demoEmail = "seller@ankursama.dev";
//     const demoPassword = "654321";

//     if (email === demoEmail && password === demoPassword) {
//       setUser({
//         email,
//         name: "Demo Seller",
//         role: "seller",
//       });
//       closeModal();
//       alert("✅ Logged in as Demo Seller");
//     } else {
//       alert("Invalid seller credentials.\nUse seller@ankursama.dev / 654321");
//     }
//   };

//   // hide component completely when modal shouldn't be visible
//   if (!showSellerLogin) return null;

//   return (
//     <div
//       className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
//       // ❌ removed onClick={closeModal}
//     >
//       <div
//         className="relative p-[2px] rounded-lg border-glow-multi"
//       >
//         <form
//           onSubmit={onSubmitHandler}
//           className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
//         >
//           <p className="text-2xl font-medium m-auto">
//             <span className="text-primary">Seller</span> Login
//           </p>

//           <div className="w-full">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               placeholder="seller@ankursama.dev"
//               className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary/50"
//               type="email"
//               required
//             />
//           </div>

//           <div className="w-full relative">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               placeholder="654321"
//               className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary/50 pr-10"
//               type={showPassword ? "text" : "password"}
//               required
//             />
//             <span
//               className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="bg-primary/60 hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerLogin;

// import React, { useState } from "react";
// import { useAppContext } from "../context/Appcontext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// const SellerLogin = () => {
//   const { showSellerLogin, setShowSellerLogin, setUser, setIsSeller } =
//     useAppContext();

//   const location = useLocation();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const demoEmail = "seller@ankursama.dev";
//   const demoPassword = "654321";

//   const closeModal = () => {
//     setShowSellerLogin(false);
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();

//     if (email === demoEmail && password === demoPassword) {
//       setUser({
//         email,
//         name: "Demo Seller",
//         role: "seller",
//       });
//       setIsSeller(true);
//       closeModal();
//       alert("Logged in as Demo Seller");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   // 🔥 SHOW ONLY ON EXACT /seller URL
//   if (location.pathname !== "/seller") return null;

//   // 🔥 SHOW ONLY IF FLAG TRUE
//   if (!showSellerLogin) return null;

//   return (
//     <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
//       <div className="relative p-[2px] rounded-lg border-glow-multi">
//         <form
//           onSubmit={onSubmitHandler}
//           className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
//         >
//           <p className="text-2xl font-medium m-auto">
//             <span className="text-primary">Seller</span> Login
//           </p>

//           <div className="w-full">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               placeholder="seller@ankursama.dev"
//               className="border border-gray-200 rounded w-full p-2 mt-1"
//               type="email"
//               required
//             />
//           </div>

//           <div className="w-full relative">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               placeholder="654321"
//               className="border border-gray-200 rounded w-full p-2 mt-1 pr-10"
//               type={showPassword ? "text" : "password"}
//               required
//             />
//             <span
//               className="absolute right-3 top-[38px] cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="bg-primary/70 hover:bg-primary text-white w-full py-2 rounded-md"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerLogin;


// import React, { useState } from "react";
// import { useAppContext } from "../context/Appcontext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// const SellerLogin = () => {
//   const { showSellerLogin, setShowSellerLogin, setUser, setIsSeller } =
//     useAppContext();

//   const location = useLocation();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const demoEmail = "seller@ankursama.dev";
//   const demoPassword = "654321";

//   const closeModal = () => {
//     setShowSellerLogin(false);
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();

//     if (email === demoEmail && password === demoPassword) {
//       setUser({
//         email,
//         name: "Demo Seller",
//         role: "seller",
//       });
//       setIsSeller(true);
//       closeModal();
//       alert("Logged in as Demo Seller");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   // Only show on /seller route
//   if (location.pathname !== "/seller") return null;
//   if (!showSellerLogin) return null;

//   return (
//     <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
//       <div className="relative p-[2px] rounded-lg border-glow-multi">
//         <form
//           onSubmit={onSubmitHandler}
//           className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
//         >
//           <p className="text-2xl font-medium m-auto">
//             <span className="text-primary">Seller</span> Login
//           </p>

//           <div className="w-full">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               placeholder="seller@ankursama.dev"
//               className="border border-gray-200 rounded w-full p-2 mt-1"
//               type="email"
//               required
//             />
//           </div>

//           <div className="w-full relative">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               placeholder="654321"
//               className="border border-gray-200 rounded w-full p-2 mt-1 pr-10"
//               type={showPassword ? "text" : "password"}
//               required
//             />
//             <span
//               className="absolute right-3 top-[38px] cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="bg-primary/70 hover:bg-primary text-white w-full py-2 rounded-md"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerLogin;




// import React, { useState } from "react";
// import { useAppContext } from "../context/Appcontext";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";

// const SellerLogin = () => {
//   const { showSellerLogin, setShowSellerLogin, setUser, setIsSeller } =
//     useAppContext();

//   const location = useLocation();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const closeModal = () => {
//     setShowSellerLogin(false);
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(
//         "http://localhost:8080/api/seller/auth/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       if (!res.ok) {
//         const msg = await res.text();
//         toast.error("Login failed: " + msg);
//         return;
//       }

//       const data = await res.json(); // { token }

//       // Save token
//       localStorage.setItem("sellerToken", data.token);
//       localStorage.setItem("sellerEmail", email);

//       // Update context
//       setUser({ email, role: "SELLER", token: data.token });
//       setIsSeller(true);

//       toast.success("Seller logged in!");
//       closeModal();

//       // Redirect seller to admin panel
//       navigate("/seller/dashboard");

//     } catch (err) {
//       toast.error("Network error");
//       console.error("Seller login error:", err);
//     }
//   };

//   // Only open on /seller route
//   if (location.pathname !== "/seller") return null;
//   if (!showSellerLogin) return null;

//   return (
//     <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50">
//       <div className="relative p-[2px] rounded-lg border-glow-multi">
//         <form
//           onSubmit={onSubmitHandler}
//           className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
//         >
//           <p className="text-2xl font-medium m-auto">
//             <span className="text-primary">Seller</span> Login
//           </p>

//           <div className="w-full">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               placeholder="seller@example.com"
//               className="border border-gray-200 rounded w-full p-2 mt-1"
//               type="email"
//               required
//             />
//           </div>

//           <div className="w-full relative">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               placeholder="Your password"
//               className="border border-gray-200 rounded w-full p-2 mt-1 pr-10"
//               type={showPassword ? "text" : "password"}
//               required
//             />
//             <span
//               className="absolute right-3 top-[38px] cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="bg-primary/70 hover:bg-primary text-white w-full py-2 rounded-md"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerLogin;


import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { showSellerLogin, setShowSellerLogin, setUser, setIsSeller } =
    useAppContext();

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
      const res = await fetch("http://localhost:8080/api/seller/auth/login", {
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

localStorage.setItem("token", data.token);
localStorage.setItem("email", data.email);


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
