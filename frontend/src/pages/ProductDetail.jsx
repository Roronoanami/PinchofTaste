

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { products, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // ---------------- FIND PRODUCT ----------------
  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => p.id === id);
      setProduct(found);

      if (found) {
        const related = products.filter(
          (p) => p.category === found.category && p.id !== found.id
        );
        setRelatedProducts(related);
      }
    }
  }, [products, id]);

  if (!product) {
    return (
      <div className="mt-20 text-center text-gray-500">
        Product not found or still loading.
      </div>
    );
  }

  return (
    <div className="mt-12 p-6">
      {/* Breadcrumb */}
      <p>
        <Link className="hover:text-primary transition" to="/">
          Home
        </Link>{" "}
        /{" "}
        <Link
          className="hover:text-primary transition"
          to={`/products/${product.category.toLowerCase()}`}
        >
          {product.category}
        </Link>{" "}
        / <span className="text-primary">{product.name}</span>
      </p>

      {/* Product Detail Section */}
      <div className="shadow-black mt-6  flex flex-col md:flex-row gap-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-w-xs rounded"
          />
        </motion.div>

        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {/* Price Section */}
          <div className="mt-3 flex flex-col">
            <div className="flex items-center gap-3">
              {product.offerPrice < product.price && (
                <p className="text-gray-400 line-through">
                  {currency}
                  {product.price}
                </p>
              )}
              <p className="text-2xl font-semibold text-primary">
                {currency}
                {product.offerPrice}
              </p>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              Exclusive of taxes
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">About Food</h2>

              {/* Description is now simple STRING (DB returns string) */}
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product.id)}
              className="mt-4 px-4 py-2 w-rounded flex cursor-pointer font-medium bg-primary/60 text-white hover:bg-primary transition"
            >
              Add To Cart
            </button>

            <button
              onClick={() => {
                addToCart(product.id);
                navigate("/cart");
              }}
              className="mt-4 px-4 py-2 rounded flex cursor-pointer font-medium bg-primary/60 text-white hover:bg-primary transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-3"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border bg-white border-primary/70 rounded text-primary hover:text-white hover:bg-primary/70 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
