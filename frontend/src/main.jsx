// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { AppContextProvider } from './context/Appcontext';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <AppContextProvider>
//       <App />
      
//     </AppContextProvider>
//   </BrowserRouter>
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/Appcontext';
import './index.css';
import Login from "./components/Login";   // ⭐ add this
import SellerLogin from "./seller/SellerLogin"; // ⭐ add this
import { useAppContext } from "./context/Appcontext";

function RootWrapper() {
  const { showUserLogin, showSellerLogin } = useAppContext();

  return (
    <>
      {showUserLogin && <Login />}          {/* ⭐ popup ALWAYS on top */}
      {showSellerLogin && <SellerLogin />}  {/* ⭐ seller popup also */}
      <App />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <RootWrapper />
    </AppContextProvider>
  </BrowserRouter>
);

