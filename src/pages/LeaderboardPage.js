import React from "react";
import "../styles/App.css";
import Header from "../components/Header";

// component to display landing page
const LeaderboardPage = (props) => {
  const { 
    game,
    toggleLevel,
    levelDisplayed,
    endGame,

  } = props;

  let level1 = false;
  let level2 = false;
  let level3 = false;

  const checkLevel = () => {
    if (levelDisplayed === 1) {
      level1 = true;
      level2 = false;
      level3 = false;
      console.log(levelDisplayed);
    } else if (levelDisplayed === 2) {
      level1 = false;
      level2 = true;
      level3 = false;
      console.log(levelDisplayed);
    } else if (levelDisplayed === 3) {
      level1 = false;
      level2 = false;
      level3 = true;
      console.log(levelDisplayed);
    }
  }

  checkLevel();

  return (
    <div className="leaderboard-container">
      <Header 
        game={game}
        endGame={endGame}
      />
      <div className="level-selector">
        <div className={level1 ? "level-option-container selected" : "level-option-container"} id="level-option-1" onClick={toggleLevel}>
          <p className="level-option-text">Level 1</p>
        </div>
        <div className={level2 ? "level-option-container selected" : "level-option-container"} id="level-option-2" onClick={toggleLevel}>
          <p className="level-option-text">Level 2</p>
        </div>
        <div className={level3 ? "level-option-container selected" : "level-option-container"} id="level-option-3" onClick={toggleLevel}>
          <p className="level-option-text">Level 3</p>
        </div>
      </div>
      <div className="leaderboard-section">
        <h2 className="leaderboard-heading">Leaderboard</h2>
        <div className="results-section">
          <div className="result-container">
            <p className="rank-text">1</p>
            <p className="user-text">Username 23 Anonymous</p>
            <p className="time-text">23.182s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;