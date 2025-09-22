import React, { useContext, useEffect } from "react";
import { SearchContext } from "../../components/Navbar/SearchContext";
import axios from "axios";
import "./Cards.css";
import eeveeSit from "../../assets/Eevee_sitting.png";
import psyConfused from "../../assets/pngegg.png"

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
    return (
      <div className="cards__start">
        <h1 className="start__heading">Search a card name to get started</h1>
        <img src={eeveeSit} alt="Eevee sitting" className="start__img"/>
      </div>
    );
  }
  if (!searchResults || searchResults.length === 0 ) {
    return (
    <div className="cards__none">
        <h1 className="none__heading">No cards found for "{searchQuery}"</h1>
        <img src={psyConfused} alt="" />
        </div>
  )}
  console.log("search results:", searchResults);
  return (
    <>
      <h1 className="title">Search Results for: {searchQuery}</h1>
      <div className="cards__container">
        {searchResults.slice(0, 6).map((card) => (
          <div className="cards" key={card.id}>
            {card.images && (
              <img
                src={card.images.small}
                alt={card.name}
                className="card__img"
              />
            )}
            <div className="card__info">
              <ul className="info__list">
                <li>Name: {card.name}</li>
                <li>Rarity: {card.rarity || "Not on File" }</li>
                <li>Series: {card.set.series || "Not on File" }</li>
                <li>Set: {card.set.name || "Not on File" }</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
