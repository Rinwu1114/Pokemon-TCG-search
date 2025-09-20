import React from "react";
import "./Home.css";
import Eevee from "../../assets/3857488369f7f92b3ad9b107c885cdf3166e3a4f_hq.gif";

const Home = () => {
  return (
    <div className="home">
      <div className="eevee">
        <img src={Eevee} alt="Eevee running gif" className="eevee__gif" />
      </div>
    </div>
  );
};

export default Home;
