import React from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";
import Level1 from "../assets/level-1.jpeg";
import Level2 from "../assets/level-2.jpeg";
import Level3 from "../assets/level-3.jpeg";
import Waldo from "../assets/waldo.jpg";
import Wenda from "../assets/wenda.jpg";
import Odlaw from "../assets/odlaw.jpg";
import Wizard from "../assets/wizard.jpg";

// component to display landing page
const LandingPage = (props) => {
  const { 
    setLevel, 
    startGame,
  } = props;

  return (
    <div className="landing-container">
      <h1 className="title-text"><span className="blue-text">Where's</span> <span className="red-text">Waldo?</span></h1>
      <p className="rules-text">Tag the characters in the image as quickly as you can! Select a level below to begin playing.</p>
      <div className="card-container">
        <Link to="/game" className="link" onClick={startGame}>
          <div className="level-card" id="level-1" onClick={setLevel}>
            <img className="card-image" src={Level1} />
            <div className="card-details">
              <p className="level-text">Level 1</p>
              <div className="level-character-images">
                <img className="character-image" src={Waldo} />
                <img className="character-image" src={Wenda} />
                <img className="character-image" src={Odlaw} />
                <img className="character-image" src={Wizard} />
              </div>
            </div>
          </div>
        </Link>
        <Link to="/game" className="link" onClick={startGame}>
          <div className="level-card" id="level-2" onClick={setLevel}>
            <img className="card-image" src={Level2} />
            <div className="card-details">
              <p className="level-text">Level 2</p>
              <div className="level-character-images">
                <img className="character-image" src={Waldo} />
                <img className="character-image" src={Wenda} />
                <img className="character-image" src={Odlaw} />
              </div>
            </div>
          </div>
        </Link>
        <Link to="/game" className="link" onClick={startGame}>
          <div className="level-card" id="level-3" onClick={setLevel}>
            <img className="card-image" src={Level3} />
            <div className="card-details">
              <p className="level-text">Level 3</p>
              <div className="level-character-images">
                <img className="character-image" src={Waldo} />
                <img className="character-image" src={Wenda} />
                <img className="character-image" src={Odlaw} />
              </div>
            </div>
          </div>
        </Link>
      </div>
      <p className="leaderboard-link-text">View the leaderboard to see how you compare to other players.</p>
      <Link to="/leaderboard">
        <button className="leaderboard-button">Leaderboard</button>
      </Link>
    </div>
  );
};

export default LandingPage;