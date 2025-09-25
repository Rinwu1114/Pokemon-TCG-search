import React, { useState, useRef, useContext } from "react";
import "./Navbar.css";
import SearchIcon from "./SearchIcon";
import logo from "../../assets/pikachu_sleeping.png"
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import axios from "axios";

const Navbar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchInputRef = useRef(null);
  
  const { setSearchQuery } = useContext(SearchContext);
  const navi = useNavigate()

  const handleSearch = async (event) => {
    const nameResults = event.target.value;
    const nameResponse = await axios.get(`/cards?q=name:${nameResults}`)
    setSearchResults(nameResponse.data)
    console.log(nameResponse.data)

    Navigate("/Cards")
  }
 
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

  function onSearchKeyDown(event) {
    if (event.key === 'Enter'){
        const query = event.target.value.trim()
        if (query) {
            setSearchQuery(query)
            navi("/Cards")
        }
    }
  }

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
              onKeyDown={onSearchKeyDown}
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
