import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

export const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [allCards, setAllCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllCards = async () => {
            try {
                const response = await axios.get("/allCards.json");
                const cards = Array.isArray(response.data) ? response.data : response.data.data;
                setAllCards(cards);
            } catch (error) {
                console.error("Error fetching all cards:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllCards();
    }, []);

  return (
    <CardsContext.Provider value={{ allCards, isLoading }}>
      {children}
    </CardsContext.Provider>
  );
}