import React from "react";
import "../styles/App.css";
import Header from "../components/Header";
import Level1Image from "../assets/level-1.jpeg";
import Level2Image from "../assets/level-2.jpeg";
import Level3Image from "../assets/level-3.jpeg";

// component to display landing page
const GamePage = (props) => {
  const { 
    game,
    activeLevel,
    endGame,
    characters,
    getCoordinates,
    guessActive,

  } = props;

  let level1 = false;
  let level2 = false;
  let level3 = false;

  const checkLevel = () => {
    if (activeLevel === 1) {
      level1 = true;
    } else if (activeLevel === 2) {
      level2 = true;
    } else if (activeLevel === 3) {
      level3 = true;
    }
  }

  checkLevel();

  return (
    <div className="game-container">
      <Header
        game={game}
        activeLevel={activeLevel}
        endGame={endGame}
        characters={characters}
      />
      {level1 && (
        <img src={Level1Image} className="game-image" onClick={getCoordinates} />
      )}
      {level2 && (
        <img src={Level2Image} className="game-image" onClick={getCoordinates} />
      )}
      {level3 && (
        <img src={Level3Image} className="game-image" onClick={getCoordinates} />
      )}
      {guessActive && (
        <div className="guess-character-container">
          {characters.map((character, index) => {
              return (
                <p className="guess-character-text">{character.name}</p>
              )
            })}
        </div>
      )}
      
    </div>
  );
};

export default GamePage;