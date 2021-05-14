import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import GamePage from "../pages/GamePage";
import LeaderboardPage from "../pages/LeaderboardPage";

// component to handle routing between pages
const Routes = (props) => {
  const {
    game,
    activeLevel,
    setLevel,
    startGame,
    endGame,
    characters,
    getCoordinates,
    toggleLevel,
    levelDisplayed,
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
    startTime,
    timeElapsed,
    fetchResults,
    leaderboard1,
    leaderboard2,
    leaderboard3,
    dataReady,
  } = props;

  return (
    <>
      {/* Landing page */}
      <Route
        exact
        path="/"
        render={(props) => (
          <LandingPage
            {...props}
            activeLevel={activeLevel}
            setLevel={setLevel}
            startGame={startGame}
          />
        )}
      />
      {/* Game page */}
      <Route
        exact
        path="/game"
        render={(props) => (
          <GamePage
            {...props}
            game={game}
            activeLevel={activeLevel}
            endGame={endGame}
            characters={characters}
            getCoordinates={getCoordinates}
            guessActive={guessActive}
            checkForMatch={checkForMatch}
            fetchCoords={fetchCoords}
            errorMessage={errorMessage}
            successMessage={successMessage}
            checkCompletion={checkCompletion}
            displayForm={displayForm}
            closeForm={closeForm}
            submitForm={submitForm}
            username={username}
            editForm={editForm}
            startTime={startTime}
            timeElapsed={timeElapsed}
          />
        )}
      />
      {/* Leaderboard page */}
      <Route
        exact
        path="/leaderboard"
        render={(props) => (
          <LeaderboardPage
            {...props}
            game={game}
            levelDisplayed={levelDisplayed}
            toggleLevel={toggleLevel}
            endGame={endGame}
            fetchResults={fetchResults}
            leaderboard1={leaderboard1}
            leaderboard2={leaderboard2}
            leaderboard3={leaderboard3}
            dataReady={dataReady}
          />
        )}
      />
    </>
  );
};

export default Routes;
