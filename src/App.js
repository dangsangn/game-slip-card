import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const originCards = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [chooseOne, setChooseOne] = useState(null);
  const [chooseTwo, setChooseTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  const generateCard = () => {
    const result = [...originCards, ...originCards]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setCards(result);
  };

  const handleChooseCard = (value) => {
    chooseOne ? setChooseTwo(value) : setChooseOne(value);
  };

  const resetChooseCard = () => {
    setChooseOne(null);
    setChooseTwo(null);
    setTurn((pre) => pre + 1);
    setDisable(false);
  };

  useEffect(() => {
    generateCard();
  }, []);

  useEffect(() => {
    if (chooseOne && chooseTwo) {
      setDisable(true);
      if (chooseOne.src === chooseTwo.src) {
        setCards((pre) => {
          return pre.map((item) => {
            if (item.src === chooseOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          });
        });
        resetChooseCard();
      } else {
        setTimeout(() => {
          resetChooseCard();
        }, 1000);
      }
    }
  }, [chooseOne, chooseTwo]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={generateCard}>New Game</button>

      <div className="container">
        {cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            handleChooseCard={handleChooseCard}
            flip={item?.matched || item === chooseOne || item === chooseTwo}
            disable={disable}
          />
        ))}
      </div>
      <h2>Turn: {turn}</h2>
    </div>
  );
}

export default App;
