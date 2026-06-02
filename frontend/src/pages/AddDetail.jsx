


import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-72 sm:w-80 md:w-96 mx-auto px-3 py-3 border border-primary/30 rounded outline-none text-gray-700 focus:ring-2 focus:ring-primary/90 transition"
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    type={type}
    required
  />
);

const AddDetail = () => {
  // ✅ IMPORTANT: get everything from context
  const { navigate, API, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    seat: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

     const saveAddress = async () => {
  try {
    if (!user || !user.token) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);

    const res = await fetch(`${API}/user/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(address),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend error:", text);
      toast.error("Failed to save address");
      return;
    }

    toast.success("Address saved successfully!");
    navigate("/cart");

  } catch (error) {
    console.error("Network error:", error);
    toast.error("Network error");
  } finally {
    setLoading(false);
  }
};

  const onSubmitHandler = (e) => {
    e.preventDefault();
    saveAddress();
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-3xl text-gray-500">
        Add order<span className="px-3 text-3xl text-primary"> Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-13">
        <div className="flex-1 max-w-md">
          <form
            onSubmit={onSubmitHandler}
            className="space-y-3 mt-6 text-sm"
          >
            <InputField
              handleChange={handleChange}
              address={address}
              name="firstName"
              type="text"
              placeholder="First Name"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone Number"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="seat"
              type="text"
              placeholder="Seat Number"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-primary/70 text-white py-2 px-6 rounded mt-3 hover:bg-primary/80 transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDetail;
