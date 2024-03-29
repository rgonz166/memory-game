import React, { useEffect, useState } from "react";
import shuffle from "./utilities/shuffle";
import Card from "./components/Card";
import Header from "./components/Header";
import useAppBadge from "./hooks/useAppBadge";

function App() {
  const [cards, setCards] = useState(shuffle);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wins, setWins] = useState(localStorage.getItem(""));
  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = (card) => {
    if (!disabled) {
      if (pickOne) {
        // Check to see if double clicking the same card
        if (pickOne.id !== card.id) {
          setPickTwo(card);
        }
      } else {
        setPickOne(card);
      }
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    localStorage.setItem("wins", 0);
    handleTurn();
    setCards(shuffle);
  };

  useEffect(() => {
    const storedWins = parseInt(localStorage.getItem("wins"));
    if (storedWins) {
      setWins(storedWins);
    } else {
      setWins(0);
    }
  }, []);

  useEffect(() => {
    let pickTimer;

    // Two cards have been click
    if (pickOne && pickTwo) {
      // Check if the cards are the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No Match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }
    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo]);

  // If player has found all matches, handle accordingly
  useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      console.log("You win!");
      setWins(wins + 1);
      localStorage.setItem("wins", wins + 1);
      handleTurn();
      setBadge();
      setCards(shuffle);
    }
  }, [cards, wins, setBadge]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />

      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;
          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          );
        })}
      </div>
      <footer>Created By: Raul Gonzalez</footer>
    </>
  );
}

export default App;
