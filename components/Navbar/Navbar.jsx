import React, { useState, useRef } from "react";
import "./Navbar.css";
import SearchIcon from "./SearchIcon";
import logo from "../../assets/pikachu_sleeping.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    setShowSearchInput(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 0);
  };

  const handleSearchBlur = () => {
    setShowSearchInput(false);
  };

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__container--left">
          <Link to = "/" className="logo">
            <img src={logo} className="logo__img"
            alt="" />
          </Link>
          <div
            className={`search__icon${showSearchInput ? ' search__icon--hidden' : ' search__icon--visible'}`}
            onClick={handleSearchClick}
          >
            <SearchIcon className="search__icon-img" />
          </div>
          <div className="searchbar">
            <input
              type="text"
              className={`searchbar__input${showSearchInput ? " searchbar__input--active" : ""}`}
              ref={searchInputRef}
              onBlur={handleSearchBlur}
              placeholder="Search for cards"
              style={{ pointerEvents: showSearchInput ? "auto" : "none" }}
            />
          </div>
        </div>

        <div className="nav__container--right">
          <ul className="nav__links--right">
            <li className="link__list--right">
                <Link to= "/" className="link"> Home </Link>
            </li>
            <li className="link__list--right">
                <Link to= "/Sets" className="link"> Sets </Link>
            </li>
            <li className="link__list--right">
                <Link to= "/Cards" className="link"> Cards </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
