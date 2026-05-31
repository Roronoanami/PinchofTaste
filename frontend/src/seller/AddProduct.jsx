


import React, { useState } from "react";
import { assets, categories } from "../assets/assets";
import { useAppContext } from "../context/Appcontext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { user, API } = useAppContext();

  const SELLER_FOOD_BASE = `${API}/seller/food`;

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!files[0]) {
      toast.error("Please upload at least 1 product image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("image", files[0]); // uploading 1 image only

    try {
      const res = await fetch(`${SELLER_FOOD_BASE}/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`, // ⬅ IMPORTANT
        },
        body: formData,
      });

      if (!res.ok) {
        toast.error("Failed to add product");
        return;
      }

      toast.success("Product added successfully!");

      // Reset fields
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setOfferPrice("");
      setFiles([]);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[55vh] overflow-y-scroll">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">

        {/* Product Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {Array(4).fill("").map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updated = [...files];
                    updated[index] = e.target.files[0];
                    setFiles(updated);
                  }}
                />

                <img
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="upload"
                />
              </label>
            ))}

          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Type name"
            className="border rounded px-3 py-2"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the item"
            className="border rounded px-3 py-2"
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Select Category</option>

            {categories.map((item, index) => (
              <option key={index} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-32">
            <label>Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="0"
              className="border rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label>Offer Price</label>
            <input
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              type="number"
              placeholder="0"
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        <button className="px-8 py-2.5 bg-primary text-white rounded hover:bg-primary/80">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
