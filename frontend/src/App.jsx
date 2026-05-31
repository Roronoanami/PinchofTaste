


// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import { Toaster } from "react-hot-toast";
// import Footer from "./components/Footer";
// import { useAppContext } from "./context/Appcontext";
// import AllProducts from "./pages/AllProducts";
// import ProductCategory from "./pages/ProductCategory";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import AddDetail from "./pages/AddDetail";
// import Contact from "./pages/Contact";
// import MyOrder from "./pages/MyOrder";
// import SellerLogin from "./seller/SellerLogin";
// import SellerLayout from "./seller/SellerLayout";
// import AddProduct from "./seller/AddProduct";
// import Order from "./seller/Order";
// import ProductList from "./seller/ProductList";

// const App = () => {
//   const location = useLocation();
//   const isSellerPath = location.pathname.includes("seller");

//   const { isSeller } = useAppContext();

//   return (
//     <div className="text-default min-h-screen text-gray-700 bg-white">
      
//       {/* Navbar only for users */}
//       {!isSellerPath && <Navbar />}

//       <Toaster />

//       {/* Main content padding logic */}
//       <div className={`${isSellerPath ? "" : "px-6 md:px-17 lg:px-23 xl:px-31"}`}>
//         <Routes>

//           {/* Public routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<AllProducts />} />
//           <Route path="/products/:category" element={<ProductCategory />} />
//           <Route path="/products/:category/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/add-detail" element={<AddDetail />} />
//           <Route path="/my-order" element={<MyOrder />} />
//           <Route path="/contact" element={<Contact />} />

//           {/* Seller routes */}
//           <Route
//             path="/seller"
//             element={isSeller ? <SellerLayout /> : <SellerLogin />}
//           >
//             <Route index element={<AddProduct />} />
//             <Route path="product-list" element={<ProductList />} />
//             <Route path="orders" element={<Order />} />
//           </Route>
//         </Routes>
//       </div>

//       {/* Footer only for users */}
//       {!isSellerPath && <Footer />}
//     </div>
//   );
// };

// export default App;


// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import { Toaster } from "react-hot-toast";
// import Footer from "./components/Footer";
// import { useAppContext } from "./context/Appcontext";
// import Login from "./components/Login";
// import AllProducts from "./pages/AllProducts";
// import ProductCategory from "./pages/ProductCategory";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import AddDetail from "./pages/AddDetail";
// import Contact from "./pages/Contact";
// import MyOrder from "./pages/MyOrder";
// import SellerLogin from "./seller/SellerLogin";
// import SellerLayout from "./seller/SellerLayout";
// import AddProduct from "./seller/AddProduct";
// import Order from "./seller/Order";
// import ProductList from "./seller/ProductList";

// const App = () => {
//   const location = useLocation();
//   const isSellerPath = location.pathname.includes("seller");

//   const { showUserLogin, showSellerLogin, isSeller } = useAppContext();

//   return (
//     <div className="text-default min-h-screen text-gray-700 bg-white">

//       {!isSellerPath && <Navbar />}
//       {showUserLogin && <Login />}
//       {showSellerLogin && <SellerLogin />}

//       <Toaster />

//       <div
//         className={`${isSellerPath ? "" : "px-6 md:px-17 lg:px-23 xl:px-31"}`}
//       >
//         <Routes>
          
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<AllProducts />} />
//           <Route path="/products/:category" element={<ProductCategory />} />
//           <Route path="/products/:category/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/add-detail" element={<AddDetail />} />
//           <Route path="/my-order" element={<MyOrder />} />
//           <Route path="/contact" element={<Contact />} />

//           {/* Seller routes */}
//           <Route
//             path="/seller"
//             element={isSeller ? <SellerLayout /> : <SellerLogin />}
//           >
//             <Route index element={<AddProduct />} />
//             <Route path="product-list" element={<ProductList />} />
//             <Route path="orders" element={<Order />} />
//           </Route>
//         </Routes>
//       </div>

//       {!isSellerPath && <Footer />}
//     </div>
//   );
// };

// export default App;



import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/Appcontext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AddDetail from "./pages/AddDetail";
import Contact from "./pages/Contact";
import MyOrder from "./pages/MyOrder";
import SellerLogin from "./seller/SellerLogin";
import SellerLayout from "./seller/SellerLayout";
import AddProduct from "./seller/AddProduct";
import Order from "./seller/Order.jsx"; // ⭐ FIXED IMPORT
import ProductList from "./seller/ProductList";

const App = () => {
const location = useLocation();
const isSellerPath = location.pathname.includes("seller");

const { showUserLogin, showSellerLogin, isSeller } = useAppContext();

return (
<div className="text-default min-h-screen text-gray-700 bg-white">

  {!isSellerPath && <Navbar />}
  {showUserLogin && <Login />}
  {showSellerLogin && <SellerLogin />}

  <Toaster />

  <div
    className={`${isSellerPath ? "" : "px-6 md:px-17 lg:px-23 xl:px-31"}`}
  >
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/products/:category" element={<ProductCategory />} />
      <Route path="/products/:category/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/add-detail" element={<AddDetail />} />
      <Route path="/my-order" element={<MyOrder />} />
      <Route path="/contact" element={<Contact />} />

      {/* Seller routes */}
      <Route
        path="/seller"
        element={isSeller ? <SellerLayout /> : <SellerLogin />}
      >
        <Route index element={<AddProduct />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="orders" element={<Order />} /> {/* FIXED */}
      </Route>
    </Routes>
  </div>

  {!isSellerPath && <Footer />}
</div>


);
};

export default App;