import React, { useEffect, useState } from "react";

const CustumerOrderStatusCard = ({ order, onClose }) => {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (!order.readyAt) return;

    const interval = setInterval(() => {
      const diff =
        new Date(order.readyAt).getTime() - new Date().getTime();

      if (diff <= 0) {
        setRemainingTime("Ready");
        clearInterval(interval);
      } else {
        setRemainingTime(Math.ceil(diff / 60000)); // minutes
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order.readyAt]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary">
            Order Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* STATUS */}
        <div className="space-y-3 text-sm">
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-primary font-semibold">
              {order.status}
            </span>
          </p>

          {order.prepTime && (
            <p>
              <strong>Preparation Time:</strong>{" "}
              {order.prepTime} min
            </p>
          )}

          {remainingTime && (
            <p>
              <strong>Remaining:</strong>{" "}
              <span className="text-green-600 font-semibold">
                {remainingTime === "Ready"
                  ? "Ready for pickup 🎉"
                  : `${remainingTime} min`}
              </span>
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustumerOrderStatusCard;
