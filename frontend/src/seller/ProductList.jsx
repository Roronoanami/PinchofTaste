

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { user, API, currency } = useAppContext();

  const [sellerProducts, setSellerProducts] = useState([]);

  const SELLER_FOOD_BASE = `${API}/seller/food`;

  // ⭐ Fetch only seller products
  const fetchSellerProducts = async () => {
    try {
      const res = await fetch(`${SELLER_FOOD_BASE}/my-products`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setSellerProducts(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  // ⭐ Delete product
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${SELLER_FOOD_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (res.ok) {
        toast.success("Product deleted");
        setSellerProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, [user]);

  return (
    <div className="no-scrollbar flex-1 h-[96vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg text-primary font-medium">Your Products</h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-600 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {sellerProducts.map((product) => (
                <tr key={product.id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded overflow-hidden">
                      <img
                        src={product.image?.[0]}
                        alt="Product"
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                    <span className="truncate w-full max-sm:hidden">
                      {product.name}
                    </span>
                  </td>

                  <td className="px-4 py-3">{product.category}</td>

                  <td className="px-4 py-3 max-sm:hidden">
                    {currency}
                    {product.offerPrice}
                  </td>

                  <td className="px-4 py-3">
                                        <button
  onClick={() => deleteProduct(product.id)}
  className="px-4 py-1 border border-gray-600 bg-white text-gray-600 hover:bg-primary hover:border-white rounded-2xl hover:bg-primary hover:text-white transition"
>
  Delete
</button>

                  </td>
                </tr>
              ))}

              {sellerProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-5 text-gray-500 italic"
                  >
                    No products added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
