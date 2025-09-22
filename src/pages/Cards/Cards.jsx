import React, { useContext, useEffect } from "react";
import { SearchContext } from "../../components/Navbar/SearchContext";
import axios from "axios";

const Cards = () => {
  const { searchQuery, searchResults, setSearchResults } =
    useContext(SearchContext);

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://api.pokemontcg.io/v2/cards?q=name:${searchQuery}`)
        .then((res) => {
          setSearchResults(res.data.data);
        })
        .catch((err) => console.error("Error fetching cards:", err));
    }
  }, [searchQuery, setSearchResults]);

  if (!searchQuery) {
    return <p className="cards__start">Search a card name to get started</p>;
  }
  if (!searchResults || searchResults === 0) {
    return <p className="cards__none">No cards found for "{searchQuery}"</p>;
  }
  console.log("search results:" , searchResults);
  return (
    <div className="cards__container">
      {searchResults.map((card) => (
        <div className="card__wrapper" key={card.id}>
          <h1>{card.name}</h1>
          {card.images && <img src={card.images.small} alt={card.name} className="card__img"/>}
        </div>
      ))}
    </div>
  );
};

export default Cards;
