



// Image imports
import logo from './pinchoftaste.png';
import search_icon from './search.png';
import nav_cart_icon from './cart.png';
import menu_icon from './menu.png';
import profile_icons from './profile.png';
import main_banner1_bg from './banner1.jpg';
import main_banner2_bg from './banner2.jpg';
import white_arrow_icon from './arrow.jpg';
import black_arrow_icon from './arrow2.jpg';
import box_icon from './burgericon.png';
import pizza_icon from './pizzaicon.png';
import drinks_icon from './drinksicon.png';
import dessert_icon from './desserticon.png';
import diet_icon from './dieticon.png';
import pasta_icon from './pastaicon.png';


import cart_icon from './cartin.png';
// burger 
import burger_image_1 from './burger1.png'; 
import burger_image_2 from './burger2.png';
// piza 
import pizza_image_2 from './pizza2.png';
import pasta_image_1 from './pasta1.png';
// drinks 
import mojito_image_1 from './mojito1.png';
import oreo_1 from './oreo.jpg';


import bottom_banner_image1 from './banner_bottom1.png';

import trust_icon from './btbannericon4.png';
import order_icon from  './btbannericon1.png';
import leaf_icon from  './btbannericon2.png';
import coin_icon from  './btbannericon3.png';

import star_icon from './star.png';
import refresh_icon from './refresh.png';
import arrow_right_icon_colored from './arrow3.png';
import address_img from './orderplaceimg.png';

import add_icon from './addicon.png';
import product_list_icon from './productlist.png';
import order_iconn from './ordericon.png';
import upload_area from './upload_area.png';


import meal_icon from './Dal Makhani.png';

import foodplaced from './finaldish.png';

export const assets = {

  add_icon,
  product_list_icon,
  order_iconn,
  upload_area,

  
  address_img,
  refresh_icon,
  arrow_right_icon_colored,
  star_icon,
  cart_icon,
  logo,
  search_icon,
  nav_cart_icon,
  menu_icon,
  main_banner1_bg,
  main_banner2_bg,
  profile_icons,
  white_arrow_icon,
  black_arrow_icon,
  box_icon,
  pizza_icon,
  drinks_icon,
  dessert_icon,
  diet_icon,
  pasta_icon,
  burger_image_1,
  burger_image_2,
  pizza_image_2,
  mojito_image_1,
  pasta_image_1,
  oreo_1,


  bottom_banner_image1,


  trust_icon,
  order_icon,
  leaf_icon,
  coin_icon,

  foodplaced,
  meal_icon,
};



export const categories = [
  { text: 'Burgers', path: 'burgers', bgColor: 'oklch(0.954 0.038 75.164)', image: assets.box_icon },
  { text: 'Pizza', path: 'pizza', bgColor: 'oklch(0.95 0.12 85)', image: assets.pizza_icon },
  { text: 'Drinks', path: 'drinks', bgColor: 'oklch(0.96 0.08 120)', image: assets.drinks_icon },
  { text: 'Dessert', path: 'dessert', bgColor: 'oklch(0.845 0.143 164.978)', image: assets.dessert_icon },
  { text: 'Diet Food', path: 'diet-food', bgColor: 'oklch(0.95 0.06 75)', image: assets.diet_icon },
  { text: 'Pasta', path: 'pasta', bgColor: 'oklch(0.808 0.114 19.571)', image: assets.pasta_icon },
  { text: 'Meal', path: 'meal', bgColor: 'oklch(0.808 0.114 19.571)', image: assets.meal_icon },
  
];



export const footerLinks =[
  {
    title:"Quick Links",
    links: [
      {text: "Home", url:""},
       {text: "Best Sellers", url:""},
        {text: "Offers", url:""},
         {text: "Contact us",url:""},
          {text: "FAQs", url:""},
          {text: "Category",url:""},
    ],
  },

  {
    title: "Need Help?",
    links: [
      {text: "Delivery Info",url:"#"},
      {text:"Return & Refund",url:"#"},
      {text:"Payment Methods",url:"#"},
      {text:"Track your Order", url:"#"},
      {text:"Contact Us",url:"#"},


    ]
  }
];


export const features = [
  {
    icon: order_icon,
    title: "Fast Order",
    description: "Food at your table delivered in under 15 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guarante",
    description: "Fresh food straight from the pan.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Quality Food at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 1000+ happy customers.",
  },
];


