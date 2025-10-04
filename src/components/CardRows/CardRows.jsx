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
       
    };

    fetchCards();
    console.log("Fetched cards:", fetchCards());
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
