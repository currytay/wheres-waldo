import React from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
import { Home } from "react-feather";

// component to display landing page
const Header = (props) => {
  const { 
    game,
    activeLevel,
    endGame,
    characters,
  } = props;

  return (
    <div className={game ? "header-container" : "header-container alt-header"}>
      <Link to="/" className="link">
        <div className="home-link-section" onClick={endGame}>
          <Home className="home-icon" alt="Home icon" />
          <p className="header-link-text">Back to Home</p>
        </div>
      </Link>
      {game && (
        <>
          <div className="character-section">
            {characters.map((character, index) => {
              let found = character.found;
              return (
                <div className={found ? "header-character character-found" : "header-character"} key={index}>
                  <img className="header-character-image" src={character.src} alt={character.alt} />
                  <p className="header-character-name">{character.name}</p>
                </div>  
              )
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;