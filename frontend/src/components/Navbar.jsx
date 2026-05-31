

import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/Appcontext'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    setShowSellerLogin,
  } = useAppContext()

  const location = useLocation()
  const cartCount = getCartCount ? getCartCount() : 0

  const logout = () => {
    setUser(null)
    navigate('/')
    setProfileOpen(false)
  }

  useEffect(() => {
    if ((searchQuery ?? "").length > 0 && location.pathname !== '/products') {
      navigate('/products')
    }
  }, [searchQuery, navigate, location.pathname])

  return (
    <nav className="px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg- relative z-50">

      {/* FIRST ROW */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <NavLink to='/' onClick={() => setOpen(false)}>
          <img className="h-10" src={assets.logo} alt="brand" />
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-8">

          <NavLink to='/' className="transition font-serif hover:text-pink-800 text-2xl">Home</NavLink>
          <NavLink to='/products' className="transition font-serif hover:text-pink-800 text-2xl">All Products</NavLink>
          <NavLink to='/contact' className="transition font-serif hover:text-pink-800 text-2xl">Contact Us</NavLink>

          {/* ⭐ DESKTOP SEARCH */}
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full bg-white">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery ?? ""}
              type="text"
              placeholder="Search products"
              className="py-1.5 w-45 bg-transparent text-gray-800 outline-none"
            />
            <img src={assets.search_icon} className='w-4 h-4 opacity-70' />
          </div>

          {/* Cart */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} className='w-9 opacity-70' />
            {cartCount > 0 && (
              <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                {cartCount}
              </button>
            )}
          </div>

          {/* Profile */}
          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-8 py-2 bg-pink-600 hover:bg-primary text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className='relative group'>
              <img src={assets.profile_icons} className="w-10 bg-gray-200 rounded-full" />

              <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border rounded-md py-2.5 w-32 text-sm'>
                <li onClick={() => navigate("my-order")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>
                  My Order
                </li>

                <li
                  onClick={() => {
                    navigate("/seller")
                    setShowSellerLogin(true)
                  }}
                  className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'
                >
                  Seller Panel
                </li>

                <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* MOBILE ICONS */}
        <div className="flex items-center gap-3 sm:hidden relative">

          {/* Cart */}
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} className="w-7 opacity-70" />
            {cartCount > 0 && (
              <button className="absolute -top-2 -right-2 text-[10px] text-white bg-primary w-[16px] h-[16px] rounded-full">
                {cartCount}
              </button>
            )}
          </div>

          {/* Profile */}
          {user && (
            <div className="relative">
              <img
                src={assets.profile_icons}
                className="w-8 h-8 bg-gray-200 rounded-full cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />

              {/* ⭐ TAP OUTSIDE TO CLOSE */}
              {profileOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                ></div>
              )}

              {profileOpen && (
                <ul className='absolute top-10 right-0 bg-white shadow border rounded-md py-2.5 w-32 text-sm z-50'>
                  <li onClick={() => { navigate("my-order"); setProfileOpen(false); }} className='p-1.5 pl-3 hover:bg-primary cursor-pointer'>
                    My Order
                  </li>
                  <li
                    onClick={() => {
                      navigate("/seller")
                      setShowSellerLogin(true)
                      setProfileOpen(false)
                    }}
                    className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'
                  >
                    Seller Panel
                  </li>
                  <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Menu Button */}
          <button onClick={() => setOpen(!open)}>
            <img src={assets.menu_icon} className='h-7' />
          </button>
        </div>
      </div>

      {/* ⭐ MOBILE SEARCH — hides when menu is open OR profile is open */}
      {!open && !profileOpen && (
        <div className="flex sm:hidden items-center mt-3 w-full gap-2 border border-gray-300 px-3 py-1 rounded-full bg-white relative z-50">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery ?? ""}
            type="text"
            placeholder="Search products"
            className="py-1 w-full bg-transparent text-gray-800 outline-none"
          />
          <img src={assets.search_icon} className='w-4 h-4 opacity-70' />
        </div>
      )}

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-[80%] sm:w-[60%] h-full bg-white shadow-lg py-6 px-5 flex flex-col gap-4">

            <button onClick={() => setOpen(false)} className="self-end text-gray-600 text-lg">✕</button>

            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>

            {user && (
              <>
                <NavLink to="/my-order" onClick={() => setOpen(false)}>My Order</NavLink>
                <button
                  onClick={() => {
                    setOpen(false)
                    navigate("/seller")
                    setShowSellerLogin(true)
                  }}
                  className="text-left hover:text-pink-800"
                >
                  Seller Panel
                </button>
              </>
            )}

            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

            {!user ? (
              <button
                onClick={() => {
                  setOpen(false)
                  setShowUserLogin(true)
                }}
                className="px-6 py-2 bg-primary text-white rounded-full"
              >
                Login
              </button>
            ) : (
              <button onClick={logout} className="px-6 py-2 bg-primary text-white rounded-full">Logout</button>
            )}
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar
