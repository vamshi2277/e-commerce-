import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/Pages/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Cart from "./Components/Pages/Cart";
import Category from "./Components/Pages/Category";
import Login from "./Components/Pages/Login";
import ProductPreview from "./Components/Pages/ProductPreview";

export const searchContext = React.createContext("");
export const cartContext = React.createContext("");
export const userContext = React.createContext(null);
export const productContext = React.createContext("");
export const fetchContext = React.createContext("");

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryGroup, setCategoryGroup] = React.useState("");
  const [CartItems, setCartItems] = React.useState([]);

  const [userName, setUserName] = React.useState("");
  const isLogged = localStorage.getItem("userName") !== null
  const [isAuth, setIsAuth] = React.useState(isLogged ?? false);

  
  const [productDetails, setProductDetails] = React.useState("");
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const searchContextValue = {
    searchTerm,
    setSearchTerm,
    categoryGroup,
    setCategoryGroup,
  };

  const cartContextValue = {
    CartItems,
    setCartItems,
    removeFromCart,
  };

  const userContextValue = {
    isAuth,
    setIsAuth,
    userName,
    setUserName,
  };

  const productContextValue = {
    productDetails,
    setProductDetails,
  };
  const featchContextValue = {
    data,
    setData,
    error,
    setError,
    loading,
    setLoading,
  };

  return (
    <userContext.Provider value={userContextValue}>
      <searchContext.Provider value={searchContextValue}>
        <cartContext.Provider value={cartContextValue}>
          <productContext.Provider value={productContextValue}>
          <fetchContext.Provider value={featchContextValue}>
            <BrowserRouter>
              {isAuth ? (
                <>
                  <NavBar />

                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/product" element={<ProductPreview />} />
                  </Routes>
                </>
              ) : (
                <Login />
              )}
            </BrowserRouter>
            </fetchContext.Provider>
          </productContext.Provider>
        </cartContext.Provider>
      </searchContext.Provider>
    </userContext.Provider>
  );
}

export default App;
