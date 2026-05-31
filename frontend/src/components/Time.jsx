import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { assets } from "../assets/assets";

// Example recipes with Veg / Non-Veg types
const recipes = [
  { title: "Burger", type: "Non-Veg", price: "$8.99", img: assets.box_icon },
  { title: "Pizza", type: "Veg", price: "$9.99", img: assets.pizza_icon },
  { title: "Salad", type: "Veg", price: "$5.50", img: assets.diet_icon },
  { title: "Steak", type: "Non-Veg", price: "$12.99", img: assets.box_icon },
  { title: "Pasta", type: "Veg", price: "$7.99", img: assets.pasta_icon },
  { title: "Cake", type: "Veg", price: "$4.50", img: assets.dessert_icon },
  { title: "Juice", type: "Veg", price: "$3.50", img: assets.drinks_icon },
];

const Time = ({ cartItems, setCartItems }) => {
  const [selectedType, setSelectedType] = React.useState("Veg"); // Veg / Non-Veg filter

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.type === selectedType
  );

  const handleAddToCart = (recipe) => {
    setCartItems([...cartItems, recipe]);
    toast.success(`${recipe.title} added!`);
  };

  const types = ["Veg", "Non-Veg"];

  return (
    <div className="bg-[#F5F5F5] p-4 sm:p-6">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Veg / Non-Veg Tabs */}
      <div className="flex justify-center gap-3 mb-4">
        {types.map((type) => (
          <div
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-1 rounded font-semibold cursor-pointer transition-colors duration-200 ${
              selectedType === type
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {type}
          </div>
        ))}
      </div>

      {/* Grid layout for all screen sizes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
        {filteredRecipes.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No {selectedType} items available
          </p>
        ) : (
          filteredRecipes.map((recipe, index) => (
            <div
              key={index}
              className="group w-32 h-32 rounded-lg bg-white flex flex-col items-center justify-center cursor-pointer shadow-md relative"
            >
              <img
                src={recipe.img}
                alt={recipe.title}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-sm font-medium text-center">{recipe.title}</p>
              <span className="absolute bottom-1 bg-yellow-400 px-2 py-0.5 text-xs font-semibold rounded">
                {recipe.price}
              </span>
              <button
                onClick={() => handleAddToCart(recipe)}
                className="absolute border-blue-700 border-2 bottom-6 left-1/2 transform -translate-x-1/2 hidden group-hover:flex bg-white text-black text-xs rounded-full w-6 h-6 items-center justify-center shadow-md"
              >
                ✔
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Time;
