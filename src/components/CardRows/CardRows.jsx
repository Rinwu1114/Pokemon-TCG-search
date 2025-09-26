import React, { useEffect, useState, useRef } from 'react'
import "./CardRows.css"
import pokemon from "pokemontcgsdk";
pokemon.configure({ apiKey: "a49f45de-99d5-4e2a-b2e4-913f512433cf" });
import { Link } from "react-router-dom"


const CardRows = ({ title, cardName, subTypes}) => {
    const [apiData, setapiData] = useState([])
    const cardsRef = useRef()

    const handlewheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY
    }
    useEffect(() => {
    let searchParts = []
    if(cardName) {
        searchParts.push(`name:${cardName}*`)
    }
    if (subTypes) {
        searchParts.push(`subtypes:"${subTypes}"`)
    }
    const q = searchParts.join(" ")

    const finalSearch = q || "*"

        pokemon.card.where(
            {
               q: finalSearch,
               orderBy: "-set.releaseDate",
               select: "id,images"
            }
        ).then((res) => {
            console.log(res)
          setapiData(res.data);
        })
        .catch ((err) => {
            console.log(err)
        })
    }, [cardName, subTypes])
    console.log(apiData)


  return (
    <div className='more__cards'>
      <h2 className='card__title'>{title}</h2>
      <div className="cardlist" ref={cardsRef} onWheel={handlewheel}>
        {apiData.map((card) => {
            return (
                <div className="card" key={card.id}>
                    <img src={card.images.small} alt={card.name} className='card__img--row' />
                </div>
            )
        })

        }
      </div>
    </div>
  )
}

export default CardRows
