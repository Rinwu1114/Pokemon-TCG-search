import React from "react";
import "./Home.css";
import Eevee from "../../assets/3857488369f7f92b3ad9b107c885cdf3166e3a4f_hq.gif";
import CardRows from "../../components/CardRows/CardRows";

const Home = () => {
  return (
    <div className="home">
      <div className="eevee">
        <img src={Eevee} alt="Eevee running gif" className="eevee__gif" />
      </div>
      <div className="more__cards">
        <CardRows title={"EX Cards"} subTypes={"EX"}></CardRows>
        <CardRows title={"Mega Evo"} subTypes={"mega"}></CardRows>
        <CardRows title={"Item"} subTypes={"trainer"}></CardRows>
      </div>
    </div>
  );
};

export default Home;
