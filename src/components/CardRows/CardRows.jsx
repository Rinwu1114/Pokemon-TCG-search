import React, { useEffect, useState, useRef } from "react";
import "./CardRows.css";
import pokemon from "pokemontcgsdk";
pokemon.configure({ apiKey: "a49f45de-99d5-4e2a-b2e4-913f512433cf" });
import { Link } from "react-router-dom";
import axios from "axios";

const CardRows = ({ title, cardName = "", subTypes = "" }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
 
  useEffect(() => {
    const scrollX = cardsRef.current;
    const handlewheel = (event) => {
      event.preventDefault();
      scrollX.scrollBy({
        left: event.deltaY * 4,
        behavior: "smooth",
      });
    };

    scrollX.addEventListener("wheel", handlewheel, { passive: false });

    return () => {
      scrollX.removeEventListener("wheel", handlewheel);
    };
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cacheKey = `cards_${subTypes || "all"}_${cardName || "all"}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) {
              setApiData(parsed);
              return;
            } else {
              console.warn("Cached data is not an array, clearing cache");
              localStorage.removeItem(cacheKey);
            }
          } catch (e) {
            console.warn("Invalid cached JSON, clearing cache");
            localStorage.removeItem(cacheKey);
          }
        }

        const res = await axios.get("/allCards.json");
        const allCards = Array.isArray(res.data) ? res.data : res.data.data;

        const filtered = allCards.filter((card) => {
          let match = true;
          if (cardName) {
            match =
              match &&
              card.name?.toLowerCase().includes(cardName.toLowerCase());
          }
          if (subTypes) {
            match =
              match &&
              card.subtypes?.some(
                (st) => st.toLowerCase() === subTypes.toLowerCase()
              );
          }
          return match;
        });

        setApiData(filtered);
        localStorage.setItem(cacheKey, JSON.stringify(filtered));
      } catch (err) {
        console.error("API error:", err);
        setApiData([]);
      }
    };

    fetchCards();
  }, [cardName, subTypes]);


  return (
    <div className="more__cards">
      <h2 className="card__title">{title}</h2>
      <div className="cardlist" ref={cardsRef}>
        {apiData.map((card) => {
          return (
            <div className="card" key={card.id}>
              <img
                src={card.images.small}
                alt={card.name}
                className="card__img--row"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardRows;
