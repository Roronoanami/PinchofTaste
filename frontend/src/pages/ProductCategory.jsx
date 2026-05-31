// import React from 'react'
// import { useAppContext } from '../context/Appcontext'
// import { useParams } from 'react-router-dom'
// import { categories } from '../assets/assets'

// import ProductCard from '../components/ProductCard'


// const ProductCategory = () => {
//   const { products } = useAppContext()
//   const { category } = useParams()

//   const searchCategory = categories.find(
//     item => item.path.toLowerCase() === category.toLowerCase()
//   )

//   const filteredProducts = products 
//   ?products.filter(
//     product => product.category.toLowerCase() === category.toLowerCase()
//   )
//   :[];
//   return (
//     <div className='mt-16'>
//       {searchCategory && (
//         <div className='flex flex-col items-end w-max'>
//           <p className='text-2xl font-medium'>
//             {searchCategory.text.toUpperCase()}
//           </p>
//           <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//         </div>
//       )}
//               <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
//                     {filteredProducts.map((product, index) => (
//                 <ProductCard key={index} product={product} />
//                     ))}
// </div>

//     </div>
//   )
// }

// export default ProductCategory


// import React from "react";
// import { useAppContext } from "../context/Appcontext";
// import { useParams } from "react-router-dom";
// import { categories } from "../assets/assets";
// import ProductCard from "../components/ProductCard";

// const ProductCategory = () => {
//   const { products } = useAppContext();
//   const { category } = useParams();

//   const searchCategory = categories.find(
//     (item) => item.path.toLowerCase() === category.toLowerCase()
//   );

//   const filteredProducts = products.filter(
//     (p) => p.category.toLowerCase() === category.toLowerCase()
//   );

//   return (
//     <div className="mt-16">
//       {searchCategory && (
//         <div className="flex flex-col items-end w-max">
//           <p className="text-2xl font-medium">
//             {searchCategory.text.toUpperCase()}
//           </p>
//           <div className="w-16 h-0.5 bg-primary rounded-full"></div>
//         </div>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCategory;


// import React from "react";
// import { useAppContext } from "../context/Appcontext";
// import { useParams } from "react-router-dom";
// import { categories } from "../assets/assets";
// import ProductCard from "../components/ProductCard";

// const ProductCategory = () => {
//   const { products } = useAppContext();
//   const { category } = useParams();

//   const searchCategory = categories.find(
//     (item) => item.path.toLowerCase() === category.toLowerCase()
//   );

//   // FIX: convert spaces → hyphens for URL matching
//   const filteredProducts = products.filter(
//     (p) =>
//       p.category.toLowerCase().replace(/\s+/g, "-") ===
//       category.toLowerCase()
//   );

//   return (
//     <div className="mt-16">
//       {searchCategory && (
//         <div className="flex flex-col items-end w-max">
//           <p className="text-2xl font-medium">
//             {searchCategory.text.toUpperCase()}
//           </p>
//           <div className="w-16 h-0.5 bg-primary rounded-full"></div>
//         </div>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCategory;


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
