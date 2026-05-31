// import React, { useState, useEffect } from 'react'
// import { useAppContext } from '../context/Appcontext'
// import ProductCard from '../components/ProductCard'

// const AllProducts = () => {
//   const { products, searchQuery } = useAppContext()
//   const [filteredProducts, setFilteredProducts] = useState([])

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       setFilteredProducts(
//         products.filter(product =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       )
//     } else {
//       setFilteredProducts(products)
//     }
//   }, [products, searchQuery])



//   return (
//     <div className='mt-17 flex flex-col'>
//       <div className='flex flex-col items-end w-max'>
//         <p className='text-2xl font-medium uppercase'>All products</p>
//         <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//       </div>
//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
//         {filteredProducts
//           .filter(p => p.inStock)
//           .map((product, index) => (
//             <ProductCard key={index} product={product} />
//           ))}
//       </div>
//     </div>
//   )
// }

// export default AllProducts



// import React, { useState, useEffect } from "react";
// import { useAppContext } from "../context/Appcontext";
// import ProductCard from "../components/ProductCard";

// const AllProducts = () => {
//   const { products, searchQuery } = useAppContext();
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       setFilteredProducts(
//         products.filter((product) =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [products, searchQuery]);

//   return (
//     <div className="mt-17 flex flex-col">
//       <div className="flex flex-col items-end w-max">
//         <p className="text-2xl font-medium uppercase">All Products</p>
//         <div className="w-16 h-0.5 bg-primary rounded-full"></div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;


import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/Appcontext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      searchQuery
        ? products.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : products
    );
  }, [products, searchQuery]);

  return (
    <div className="mt-17 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
