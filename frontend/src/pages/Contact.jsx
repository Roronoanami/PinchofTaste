import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
      {/* Left section */}
      <div>
        <h2 className="text-4xl  hover:text-primary/90  transition ease-in-out duration-700  cursor-pointer font-medium mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-8">
          
        </p>

        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-primary text-xl mt-1" />
            <span>Unlisted</span>
          </li>
          <li className="flex items-start gap-3">
            <FaPhoneAlt className="text-primary text-xl mt-1" />
            <span>+91 8931085321</span>
          </li>
          <li className="flex items-start gap-3">
            <FaEnvelope className="text-primary text-xl mt-1" />
            <span>codeankut@gmail.com</span>
          </li>
        </ul>
      </div>

      {/* Right section - form */}
      <form className="bg-white rounded-lg p-8 space-y-6">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            rows="5"
            placeholder="Write your message"
            className="w-full border border-gray-300 rounded-md p-2 focus:border-primary focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-md transition-all"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
