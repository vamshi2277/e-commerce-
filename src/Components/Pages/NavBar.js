import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchContext, userContext } from "../../App";
import "../../Styles/NavBar.css";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";

const NavBar = () => {
  const { searchTerm, setSearchTerm, setCategoryGroup } = React.useContext(searchContext);
  const { setIsAuth, userName, setUserName } = React.useContext(userContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userName");
    setIsAuth(false);
    setUserName("");
  };

  return (
    <>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="nav-brand-link">
            Kaliyug
            <div className="nav-brand-subtext">Bazaar</div>
          </Link>
        </div>
        <Link
          className="nav-category"
          to="/category"
          onClick={() => {
            setCategoryGroup("Fashion & Accessories");
            setSearchTerm("");
          }}
        >
          Fashion
        </Link>
        <Link
          className="nav-category"
          to="/category"
          onClick={() => {
            setCategoryGroup("Electronics & Gadgets");
          }}
        >
          Gadgets
        </Link>
        <Link
          className="nav-category"
          to="/category"
          onClick={() => {
            setCategoryGroup("Home & Living");
          }}
        >
          Home Essentials
        </Link>
        <Link
          className="nav-category"
          to="/category"
          onClick={() => {
            setCategoryGroup("Sports & Vehicles");
          }}
        >
          Sports & Vehicles
        </Link>
        <input
          type="search"
          className="nav-search-box"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            navigate("/category");
          }}
        />
        <Link to="/cart" className="nav-cart">
          Cart
        </Link>
        <div className="nav-profile">
          <span className="nav-username">{localStorage.getItem("userName")} </span>
          <div className="nav-dropdown">
            <span onClick={handleLogOut}>Logout</span>
          </div>
        </div>
        <div className="nav-menu" onClick={() => setMenuOpen(true)}>
          <BsFillMenuButtonWideFill />
        </div>
      </div>

      <div className={`menu-bar ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}> 
        <span className="menu-close" onClick={() => setMenuOpen(false)}>
          <ImCross />
        </span>
        <div className="menu">
          <span
            className="menu-username"
            onClick={() => {
              setMenuOpen(false);
              navigate("/");
            }}
          >
            {localStorage.getItem("userName")}
          </span>
          <Link
            className="menu-category"
            to="/category"
            onClick={() => {
              setCategoryGroup("Fashion & Accessories");
              setSearchTerm("");
              setMenuOpen(false);
            }}
          >
            Fashion
          </Link>
          <Link
            className="menu-category"
            to="/category"
            onClick={() => {
              setCategoryGroup("Electronics & Gadgets");
              setMenuOpen(false);
            }}
          >
            Gadgets
          </Link>
          <Link
            className="menu-category"
            to="/category"
            onClick={() => {
              setCategoryGroup("Home & Living");
              setMenuOpen(false);
            }}
          >
            Home Essentials
          </Link>
          <Link
            className="menu-category"
            to="/category"
            onClick={() => {
              setCategoryGroup("Sports & Vehicles");
              setMenuOpen(false);
            }}
          >
            Sports & Vehicles
          </Link>
          <Link
            to="/cart"
            className="menu-cart"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          <span className="logout" onClick={handleLogOut}>Logout</span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
