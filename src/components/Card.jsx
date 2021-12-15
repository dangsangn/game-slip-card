import React from "react";

const Card = ({ card, handleChooseCard, flip, disable }) => {
  const clickCard = () => {
    !disable && handleChooseCard(card);
  };
  return (
    <div className={flip ? "wrap-card flip" : "wrap-card"}>
      <div className="wrap-content">
        <div className="card-back">
          <img src={card.src} alt="" />
        </div>

        <div className="card-front">
          <img src="./img/cover.png" alt="" onClick={clickCard} />
        </div>
      </div>
    </div>
  );
};

export default Card;
