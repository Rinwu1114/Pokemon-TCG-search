import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Sets.css";

const Sets = () => {
  const [sets, setSets] = useState([]);

  useEffect(() => {
  async function fetchAllSets() {
    try {
        const cached = localStorage.getItem('pokemonSets');
        if (cached) {
            setSets(JSON.parse(cached));
            return;
        }
      const response = await axios.get(
        `/sets?pageSize=250&orderBy=-releaseDate`
      );
      if (response?.data?.data) {
        setSets(response.data.data);
        localStorage.setItem('pokemonSets', JSON.stringify(response.data.data)); // Cache the data
      }
    } catch (err) {
      console.error("API error:", err);
      setSets([]);
    }
  }
  fetchAllSets();
}, []);

  // Group sets by series
  const setsBySeries = useMemo(() => {
    return sets.reduce((groups, set) => {
      const series = set.series;
      if (!groups[series]) groups[series] = [];
      groups[series].push(set);
      return groups;
    }, {});
  }, [sets]);

  //Organize sets series by most recent release date
  const sortedSeries = useMemo(() => {
    return Object.entries(setsBySeries).sort(
      ([seriesA, setsA], [seriesB, setsB]) => {
        if (seriesA === "Other") return 1; // Always move "Other" down
        if (seriesB === "Other") return -1; // Always move "Other" up
        const newestA = Math.max(
          ...setsA.map((set) => new Date(set.releaseDate))
        );
        const newestB = Math.max(
          ...setsB.map((set) => new Date(set.releaseDate))
        );
        return newestB - newestA;
      }
    );
  }, [setsBySeries]);

  return (
    <div className="sets__container">
      {sortedSeries.map(([series, setsInSeries]) => (
        <div key={series} className="sets__category">
          <h1 className="set__series">{series}</h1>
          <div className="sets__list">
            {[...setsInSeries]
              .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
              .map((set) => (
                <div className="sets" key={set.id}>
                  <img
                    src={set.images.logo}
                    alt={set.name}
                    className="sets__img"
                    loading="lazy"
                  />
                  <div className="sets__info">
                    <p>Set Name: {set.name}</p>
                    <p>Release Date: {set.releaseDate}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sets;
