
import React from "react";
import { useAppContext } from "../context/Appcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const { setShowUserLogin, setUser, setToken, AUTH_BASE } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();


  if (location.pathname.startsWith("/seller")) return null;

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // Auto-build backend URL if needed
  // const derivedAuthBase =
  //   AUTH_BASE ||
  //   `${window.location.protocol}//${window.location.hostname}:${
  //     import.meta.env.VITE_BACKEND_PORT || "8080"
  //   }/api/auth`;


  // const derivedAuthBase = `${API}/auth`;


  const derivedAuthBase = `${import.meta.env.VITE_API_URL}/api/auth`;
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // ---------------- REGISTER ----------------
      if (state === "register") {
        const res = await fetch(`${derivedAuthBase}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const msg = await res.text();
        if (!res.ok) {
          toast.error("Registration failed: " + msg);
          return;
        }

        toast.success("Account created successfully!");
        setState("login");
        return;
      }

      // ---------------- LOGIN ----------------
      const res = await fetch(`${derivedAuthBase}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        toast.error("Login failed: " + msg);
        return;
      }

      const data = await res.json(); // { email, token }

      // ⭐ SAVE TOKEN + EMAIL FOR REFRESH SUPPORT
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      // ⭐ UPDATE CONTEXT
      setToken(data.token);
      setUser({
        email: data.email,
        token: data.token,
      });

     
       setShowUserLogin(false);
toast.success("Login successful!");

// Redirect user back to cart if they were adding food
if (window.location.pathname === "/cart") {
  navigate("/cart");
}
 
    } catch (error) {
      toast.error("Network error");
      console.warn("Auth error:", error);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative p-[2px] rounded-lg border-glow-multi"
      >
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">User</span>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </p>

          {state === "register" && (
            <div className="w-full">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Your name"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary/50"
                type="text"
                required
              />
            </div>
          )}

          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="you@example.com"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary/50"
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
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary/50 pr-10"
              type={showPassword ? "text" : "password"}
              required
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {state === "register" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          ) : (
            <p>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          )}

          <button className="bg-primary/60 hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer">
            {state === "register" ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
