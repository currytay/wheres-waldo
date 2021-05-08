import React, { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Routes from "./components/Routes";
import "./styles/App.css";
import Waldo from "./assets/waldo.jpg";
import Wenda from "./assets/wenda.jpg";
import Odlaw from "./assets/odlaw.jpg";
import Wizard from "./assets/wizard.jpg";

function App() {

  const [game, setGame] = useState(false);

  const startGame = () => {
    setGame(true);
  }

  const endGame = () => {
    setGame(false);
    setLevelDisplayed(1);
    setGuessActive(false);
  }

  const [activeLevel, setActiveLevel] = useState(null);
  const [characters, setCharacters] = useState([]);

  const level1Chars = [
    {
      name: "Waldo",
      src: Waldo,
      alt: "Image of Waldo",
      found: false,
    },
    {
      name: "Wenda",
      src: Wenda,
      alt: "Image of Wenda",
      found: false,
    },
    {
      name: "Odlaw",
      src: Odlaw,
      alt: "Image of Odlaw",
      found: false,
    },
    {
      name: "Wizard",
      src: Wizard,
      alt: "Image of Wizard",
      found: false,
    }
  ];

  const otherLevelChars = [
    {
      name: "Waldo",
      src: Waldo,
      alt: "Image of Waldo",
      found: false,
    },
    {
      name: "Wenda",
      src: Wenda,
      alt: "Image of Wenda",
      found: false,
    },
    {
      name: "Odlaw",
      src: Odlaw,
      alt: "Image of Odlaw",
      found: false,
    },
  ];

  const setLevel = (event) => {
    let levelID = event.currentTarget.id;
    let levelNum = parseInt(levelID.slice(-1));
    if (levelNum < 2) {
      setCharacters(level1Chars);
    } else {
      setCharacters(otherLevelChars);
    }
    setActiveLevel(levelNum);
  }

  const [guessActive, setGuessActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const getCoordinates = (event) => {
    console.log(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setCoords({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
    setGuessActive(true);
  }

  const [levelDisplayed, setLevelDisplayed] = useState(1);

  const toggleLevel = (event) => {
    let levelID = event.currentTarget.id;
    let levelNum = parseInt(levelID.slice(-1));
    setLevelDisplayed(levelNum);
  }

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Routes
            game={game}
            startGame={startGame}
            endGame={endGame}
            activeLevel={activeLevel}
            setLevel={setLevel}
            characters={characters}
            getCoordinates={getCoordinates}
            levelDisplayed={levelDisplayed}
            toggleLevel={toggleLevel}
            guessActive={guessActive}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
