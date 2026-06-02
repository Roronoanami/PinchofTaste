

import React from "react";
import { useAppContext } from "../context/Appcontext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const cat = categories.find(
    (c) => c.path.toLowerCase() === category.toLowerCase()
  );

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === (cat?.text.toLowerCase() || "")
  );

  return (
    <div className="mt-16">
      {cat && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">{cat.text.toUpperCase()}</p>
          <div className="w-16 h-0.5 bg-primary"></div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
