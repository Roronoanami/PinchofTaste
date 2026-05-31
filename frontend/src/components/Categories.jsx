import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';



const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-6">
      <p className="text-2xl md:text-3xl font-medium mb-4">Categories</p>
      

      {/* Mobile: horizontal scroll with snap */}
      <div className="sm:hidden flex space-x-4 overflow-x-auto px-2
                      scrollbar-thin scrollbar-thumb-transparent scrollbar-transparent
                      snap-x snap-mandatory">
        {categories.map((category, index) => (
          <div
            key={index}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            className="flex-shrink-0 w-32 py-4 px-3 rounded-lg flex flex-col items-center justify-center cursor-pointer
                       snap-start"
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-16 h-16 object-contain mb-2"
            />
            <p className="text-sm font-medium text-center">{category.text}</p>
          </div>
        ))}
      </div>

      {/* Desktop: grid layout */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            className="group cursor-pointer py-5 px-4 gap-2 rounded-lg flex flex-col justify-center items-center"
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-105 transition max-w-[7rem] h-auto"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

