import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider
      value={{ searchResults, setSearchResults, searchQuery, setSearchQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};
