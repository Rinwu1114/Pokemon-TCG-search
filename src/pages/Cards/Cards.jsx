import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../components/Navbar/SearchContext";
import { CardsContext } from "./CardsContext";
import axios from "axios";
import "./Cards.css";
import eeveeSit from "../../assets/Eevee_sitting.png";
import psyConfused from "../../assets/pngegg.png";

const Cards = () => {
  const { searchQuery } = useContext(SearchContext);
  const { allCards, isLoading: cardsLoading } = useContext(CardsContext);

  const [ filteredCards, setFilteredCards ] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredCards([]);
      setIsLoading(false);
      return;
    }

  setIsLoading(true);

setTimeout(() => {
    const lowerQuery = searchQuery.toLowerCase();

    const matchedCards = allCards
      .filter((card) => card.name?.toLowerCase().includes(lowerQuery))
      .filter(card => card.setDetails?.releaseDate)
      .sort((a, b) => {
        const parseDate = (dateStr) => {
  if (!dateStr) return new Date("1900-01-01");
  const parts = dateStr.split("/"); // "YYYY/MM/DD"
  if (parts.length === 3) {
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  }
  return new Date(dateStr);
};

        const dateA = parseDate(a.setDetails?.releaseDate);
        const dateB = parseDate(b.setDetails?.releaseDate);
        return dateB - dateA; // newest first
      });

    setFilteredCards(matchedCards);
    console.log("Matched cards sample:", matchedCards.slice(0, 5));
    setIsLoading(false);
  }, 1000);

}, [searchQuery, allCards]);

  if (!searchQuery) {
    return (
      <div className="cards__start">
        <h1 className="start__heading">Search a card name to get started</h1>
        <img src={eeveeSit} alt="Eevee sitting" className="start__img" />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="cards__container--loading">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div className="cards__loading" key={idx}>
            <div className="card__img--loading"></div>
            <div className="card__info--loading">
              <ul className="info__list--loading">
                <li className="info__list--details--loading"> </li>
                <li className="info__list--details--loading"> </li>
                <li className="info__list--details--loading"> </li>
                <li className="info__list--details--loading"> </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!filteredCards || filteredCards.length === 0) {
    return (
      <div className="cards__none">
        <div className="card__none--loaded">
          <h1 className="none__heading">No cards found for "{searchQuery}"</h1>
          <img src={psyConfused} alt="" />
        </div>
      </div>
    );
  }
  console.log("search results:", filteredCards);
  console.log("Rendering cards in order:", filteredCards.map(c => c.setDetails.releaseDate));
  return (
    <>
      <h1 className="title">Search Results for: {searchQuery}</h1>
      <div className="cards__container">
        {filteredCards.slice(0, 6).map((card, idx) => (
          <div className="cards" key={`${card.id}-${idx}`}>
            {card.images && (
              <img
                src={card.images.small}
                alt={card.name}
                className="card__img"
                loading="lazy"
              />
            )}
            <div className="card__info">
              <ul className="info__list">
                <li>Name: {card.name}</li>
                <li>Rarity: {card.rarity || "Not on File"}</li>
                <li>Set: {card.setDetails.name || "Not on File"}</li>
                <li>Series: {card.setDetails.series || "Not on File"}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
