


import React from "react";
import { useAppContext } from "../context/Appcontext";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const ProductCard = ({ product }) => {
  const [hover, setHover] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0, w: 0, h: 0 });
  const [colors, setColors] = React.useState({});
  const ref = React.useRef(null);

  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  const random = () =>
    ["#ff4d6d", "#06b6d4", "#facc15", "#8b5cf6", "#22c55e"][
      Math.floor(Math.random() * 5)
    ];

  const hoverEnter = () => {
    setHover(true);
    setColors({
      top: random(),
      bottom: random(),
      left: random(),
      right: random(),
    });
  };

  const hoverLeave = () => setHover(false);

  const handleMove = (e) => {
    if (!ref.current) return;
    const box = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - box.left,
      y: e.clientY - box.top,
      w: box.width,
      h: box.height,
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={hoverEnter}
      onMouseLeave={hoverLeave}
      onMouseMove={handleMove}
      onTouchStart={(e) => {
        hoverEnter();
        const touch = e.touches[0];
        handleMove({ clientX: touch.clientX, clientY: touch.clientY });
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        handleMove({ clientX: touch.clientX, clientY: touch.clientY });
      }}
      onTouchEnd={hoverLeave}
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product.id}`);
        scrollTo(0, 0);
      }}
      className="relative w-full max-w-[260px] md:max-w-[300px] rounded-2xl 
                 p-2 bg-white cursor-pointer shadow-md hover:shadow-xl 
                 transition-all duration-300 overflow-hidden"
    >
      {/* 🔥 MOVING BORDER ANIMATION */}
      {hover && (
        <>
          <div
            className="absolute left-0 w-full h-[2px] pointer-events-none transition-all duration-75"
            style={{
              top: 0,
              background: colors.top,
              transform: `translateX(${pos.x - pos.w / 2}px)`,
            }}
          />
          <div
            className="absolute left-0 w-full h-[2px] pointer-events-none transition-all duration-75"
            style={{
              bottom: 0,
              background: colors.bottom,
              transform: `translateX(${pos.x - pos.w / 2}px)`,
            }}
          />
          <div
            className="absolute top-0 h-full w-[2px] pointer-events-none transition-all duration-75"
            style={{
              left: 0,
              background: colors.left,
              transform: `translateY(${pos.y - pos.h / 2}px)`,
            }}
          />
          <div
            className="absolute top-0 h-full w-[2px] pointer-events-none transition-all duration-75"
            style={{
              right: 0,
              background: colors.right,
              transform: `translateY(${pos.y - pos.h / 2}px)`,
            }}
          />
        </>
      )}

      {/* CONTENT */}
      <div className="relative z-10 bg-white rounded-xl p-4 flex flex-col items-center text-center">

        {/* ⭐ FIXED IMAGE SIZE (NO UI SHIFT) */}
        <motion.img
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 1.6 }}
          transition={{ duration: 0.2 }}
          className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] object-cover rounded-lg"
          src={product.imageUrl || assets.placeholder_img}
          alt={product.name}
        />

        {/* Text */}
        <div className="mt-2 text-sm w-full">
          <p
            className="text-xs font-medium transition-colors duration-300"
            style={{ color: hover ? colors.top : "rgba(107,114,128,0.6)" }}
          >
            {product.category}
          </p>
          <p className="font-semibold text-gray-700 text-sm md:text-base truncate">
            {product.name}
          </p>
        </div>

        {/* Price + Cart */}
        <div
          className="flex items-center justify-between w-full px-1 mt-3 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-start">
            <span className="text-primary font-semibold">
              {currency}
              {product.offerPrice}
            </span>
            <span className="line-through text-gray-400 text-xs">
              {currency}
              {product.price}
            </span>
          </div>

          {!cartItems[product.id] ? (
            <button
              onClick={() => addToCart(product.id)}
              className="flex items-center gap-1 bg-primary/20 border border-primary/30 
                         px-2.5 py-1 rounded-md text-primary font-medium hover:bg-primary/40 
                         transition-all duration-200"
            >
              <img src={assets.cart_icon} className="h-5" alt="cart" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-primary/30 px-2.5 py-1 rounded-md">
              <button onClick={() => removeFromCart(product.id)} className="px-2 font-bold">
                -
              </button>
              <span>{cartItems[product.id]}</span>
              <button onClick={() => addToCart(product.id)} className="px-2 font-bold">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
