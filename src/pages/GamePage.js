import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import Header from "../components/Header";
import Level1Image from "../assets/level-1.jpeg";
import Level2Image from "../assets/level-2.jpeg";
import Level3Image from "../assets/level-3.jpeg";
import { X } from "react-feather";

// component to display landing page
const GamePage = (props) => {
  const { 
    game,
    activeLevel,
    endGame,
    characters,
    getCoordinates,
    guessActive,
    checkForMatch,
    fetchCoords,
    errorMessage,
    successMessage,
    checkCompletion,
    displayForm,
    closeForm,
    submitForm,
    username,
    editForm,
    timeElapsed,
  } = props;

  // vars + function change content based on level selected by user
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

  // function to fetch character coords when level changes
  useEffect(() => {
    fetchCoords();
  }, [activeLevel]);

  // function to check for game completion (i.e., all characters found)
  useEffect(() => {
    checkCompletion();
  }, [characters]);

  let formComplete = false;

  // function to check for form completion (i.e., user has entered username)
  const checkForm = () => {
    if (username.length > 0) {
      formComplete = true;
    } else if (username.length === 0) {
      formComplete = false;
    }
  }

  checkForm();

  return (
    <div className={displayForm ? "game-container page-overlay" : "game-container"}>
      <Header
        game={game}
        activeLevel={activeLevel}
        endGame={endGame}
        characters={characters}
      />
      {errorMessage.show && (
        <div className="feedback feedback-fail">
          <p className="feedback-text">Try again!</p>
        </div>
      )}
      {successMessage.show && (
        <div className="feedback feedback-success">
          <p className="feedback-text">Nice job!</p>
        </div>
      )}
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
              let found = character.found;
              return (
                <p className={found ? "option-found" : "guess-character-text"} key={index} onClick={found ? undefined : checkForMatch} id={character.id}>{character.name}</p>
              )
            })}
        </div>
      )}
      {displayForm && (
        <div className="modal-container">
          <div className="score-modal">
            <div className="modal-heading">
              <p className="modal-heading-text">Submit your score</p>
              <Link to="/" className="link">
                <X className="modal-close-button" onClick={closeForm}/>
              </Link>
            </div>
            <p className="modal-description-text">You completed this level in <span className="modal-text-bold">{timeElapsed}</span> seconds! Enter your name below to save your score.</p>
            <input className="modal-entry" value={username} onChange={editForm}></input>
            {formComplete && (
              <Link to="/" className="link">
                <button className="modal-submit-button" onClick={submitForm}>Submit</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;