
import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const MainBranner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [assets.main_banner1_bg, assets.main_banner2_bg];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="relative w-full">
      {/* Banner Image */}
      <img
        src={banners[currentBanner]}
        alt="banner"
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] object-cover transition-opacity duration-1000"
      />

      {/* Scroll Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full ${currentBanner === index ? 'bg-white' : 'bg-gray-400'} transition`}
          />
        ))}
      </div>

      {/* Banner Text & Buttons */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-20 md:pb-0 px-4 sm:px-6 md:pl-18 lg:pl-24">
        <h1 className="hidden sm:block text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center md:text-left max-w-md md:max-w-80 lg:max-w-105 leading-snug md:leading-tight lg:leading-15">
          All kind of Tasty & Flavourful meals on Zengs Cafe
        </h1>

        <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-6 font-medium gap-2 sm:gap-4">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-pink-800 ease-in-out duration-1000 transition rounded text-white cursor-pointer"
          >
            Show Now
            <FiArrowRight className="ml-1 sm:ml-2" size={18} />
          </Link>

          <Link
            to={"/products"}
            className="group text-orange-700 hover:text-black transition hidden sm:flex items-center gap-2 px-6 sm:px-9 py-2 sm:py-3 cursor-pointer"
          >
            Explore deals
            <FiArrowRight className="ml-1 sm:ml-2" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBranner;
