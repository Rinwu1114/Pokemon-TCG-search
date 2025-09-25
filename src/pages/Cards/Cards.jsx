import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../components/Navbar/SearchContext";
import axios from "axios";
import "./Cards.css";
import eeveeSit from "../../assets/Eevee_sitting.png";
import psyConfused from "../../assets/pngegg.png";
import pokemon from "pokemontcgsdk";
pokemon.configure({ apiKey: "a49f45de-99d5-4e2a-b2e4-913f512433cf" });

const Cards = () => {
  const { searchQuery, searchResults, setSearchResults } =
    useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchQuery){
        setIsLoading(true)
      pokemon.card
        .where({
          q: `name:${searchQuery}*`,
          pageSize: 6,
          select: "id,name,images,rarity,set",
          orderBy: "-set.releaseDate"
        })
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch ((err) => {
            console.log(err)
        })
        .finally(() => setIsLoading(false))
    }
  }, [searchQuery]);

  if (!searchQuery) {
    return (
      <div className="cards__start">
        <h1 className="start__heading">Search a card name to get started</h1>
        <img src={eeveeSit} alt="Eevee sitting" className="start__img" />
      </div>
    );
  }
  if (isLoading) {
    return(
        <div className="cards__container--loading">
           { Array.from({ length: 6 }).map((_, idx) => (
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
    )
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="cards__none">
        <div className="card__none--loaded">
            <h1 className="none__heading">No cards found for "{searchQuery}"</h1>
            <img src={psyConfused} alt="" />
        </div>
      </div>
    );
  }
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
                loading="lazy"
              />
            )}
            <div className="card__info">
              <ul className="info__list">
                <li>Name: {card.name}</li>
                <li>Rarity: {card.rarity || "Not on File"}</li>
                <li>Series: {card.set.series || "Not on File"}</li>
                <li>Set: {card.set.name || "Not on File"}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
