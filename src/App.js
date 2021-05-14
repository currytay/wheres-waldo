import React, { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Routes from "./components/Routes";
import "./styles/App.css";
import Waldo from "./assets/waldo.jpg";
import Wenda from "./assets/wenda.jpg";
import Odlaw from "./assets/odlaw.jpg";
import Wizard from "./assets/wizard.jpg";
import firebase from "firebase/app";
import { firestore } from "./Firebase";

function App() {

  // variable and function to start game
  const [game, setGame] = useState(false);
  const [startTime, setStartTime] = useState();

  const startGame = () => {
    setGame(true);
    setStartTime(Date.now());
  }

  // function to end game
  const endGame = () => {
    setGame(false);
    setLevelDisplayed(1);
    setGuessActive(false);
    setCharactersFound(0);
  }

  // variables to track valid coords for each character
  const [waldoCoords, setWaldoCoords] = useState([]);
  const [wendaCoords, setWendaCoords] = useState([]);
  const [odlawCoords, setOldawCoords] = useState([]);
  const [wizardCoords, setWizardCoords] = useState([]);

  // function to fetch valid coords for each character
  const fetchCoords = () => {
    let currentLevel = "level-" + activeLevel;
    let waldoData = firestore.collection(currentLevel).doc("waldo");
    let wendaData = firestore.collection(currentLevel).doc("wenda");
    let odlawData = firestore.collection(currentLevel).doc("odlaw");
    let wizardData = firestore.collection(currentLevel).doc("wizard");

    waldoData.get().then((doc) => {
      setWaldoCoords({ x: doc.data().xCoords, y: doc.data().yCoords })
    });

    wendaData.get().then((doc) => {
      setWendaCoords({ x: doc.data().xCoords, y: doc.data().yCoords })
    });

    odlawData.get().then((doc) => {
      setOldawCoords({ x: doc.data().xCoords, y: doc.data().yCoords })
    });

    if (activeLevel === 1) {
      wizardData.get().then((doc) => {
        setWizardCoords({ x: doc.data().xCoords, y: doc.data().yCoords })
      });
    }
  }

  // variables to track active level and respective characters
  const [activeLevel, setActiveLevel] = useState(null);
  const [characters, setCharacters] = useState([]);

  // character arrays
  const level1Chars = [
    {
      name: "Waldo",
      id: "waldo",
      src: Waldo,
      alt: "Image of Waldo",
      found: false,
    },
    {
      name: "Wenda",
      id: "wenda",
      src: Wenda,
      alt: "Image of Wenda",
      found: false,
    },
    {
      name: "Odlaw",
      id: "odlaw",
      src: Odlaw,
      alt: "Image of Odlaw",
      found: false,
    },
    {
      name: "Wizard",
      id: "wizard",
      src: Wizard,
      alt: "Image of Wizard",
      found: false,
    }
  ];

  const otherLevelChars = [
    {
      name: "Waldo",
      id: "waldo",
      src: Waldo,
      alt: "Image of Waldo",
      found: false,
    },
    {
      name: "Wenda",
      id: "wenda",
      src: Wenda,
      alt: "Image of Wenda",
      found: false,
    },
    {
      name: "Odlaw",
      id: "odlaw",
      src: Odlaw,
      alt: "Image of Odlaw",
      found: false,
    },
  ];

  // function to set level based on user selection
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

  // vars + function to determine/track user guesses
  const [guessActive, setGuessActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [xCoordsGuess, setXCoordsGuess] = useState();
  const [yCoordsGuess, setYCoordsGuess] = useState();

  const getCoordinates = (event) => {
    let percentX = ((event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100).toFixed(0);
    let percentY = ((event.nativeEvent.offsetY / event.currentTarget.offsetHeight) * 100).toFixed(0);
    setCoords({ x: percentX, y: percentY });
    setXCoordsGuess(percentX);
    setYCoordsGuess(percentY);
    setGuessActive(true);
  }

  // var + function to determine level displayed on leaderboard page
  const [levelDisplayed, setLevelDisplayed] = useState(1);

  const toggleLevel = (event) => {
    let levelID = event.currentTarget.id;
    let levelNum = parseInt(levelID.slice(-1));
    setLevelDisplayed(levelNum);
  }

  // functions to check for match between user guess and valid coords
  const checkForMatch = (event) => {
    let selectedCharacter = event.target.id;
    compareCoords(selectedCharacter);
    setGuessActive(false);
  }

  const compareCoords = (name) => {
    let xGuess = parseInt(xCoordsGuess);
    let yGuess = parseInt(yCoordsGuess);
    let xValid;
    let yValid;
    let indexValue;

    if (name === "waldo") {
      xValid = waldoCoords.x;
      yValid = waldoCoords.y;
      indexValue = 0;
    } else if (name === "wenda") {
      xValid = wendaCoords.x;
      yValid = wendaCoords.y;
      indexValue = 1;
    } else if (name === "odlaw") {
      xValid = odlawCoords.x;
      yValid = odlawCoords.y;
      indexValue = 2;
    } else if (name === "wizard") {
      xValid = wizardCoords.x;
      yValid = wizardCoords.y;
      indexValue = 3;
    }

    if (xValid.includes(xGuess) && yValid.includes(yGuess)) {
      let currentCharacters = [...characters];
      currentCharacters[indexValue].found = true;
      setCharacters([...currentCharacters]);
      setCharactersFound(charactersFound + 1);
      displaySuccess();
    } else {
      displayError();
    }
  }

  // variable to display error message if user guess is wrong
  const [errorMessage, setErrorMessage] = useState({
    show: false,
  });

  // function to display error message
  const displayError = () => {
    if (!errorMessage.show) {
      setErrorMessage((prev) => ({ ...prev, show: true })); // show error
      setTimeout(() => {
        setErrorMessage((prev) => ({ ...prev, show: false })); // hide error
      }, 2000);
    }
  };

  // variable to display success message if user guess is correct
  const [successMessage, setSuccessMessage] = useState({
    show: false,
  });

  // function to display success message
  const displaySuccess = () => {
    if (!errorMessage.show) {
      setSuccessMessage((prev) => ({ ...prev, show: true })); // show error
      setTimeout(() => {
        setSuccessMessage((prev) => ({ ...prev, show: false })); // hide error
      }, 2000);
    }
  }

  // vars + function to track level completion and details
  const [charactersFound, setCharactersFound] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState();

  const checkCompletion = () => {
    if (charactersFound ===  characters.length) {
      setDisplayForm(true);
      let endTime = Date.now();
      setTimeElapsed((endTime - startTime) / 1000);
    } else {
      return;
    }
  }

  // vars + function to edit, close, submit form
  const [username, setUsername] = useState("");

  const editForm = (event) => {
    let newUsername = event.target.value;
    setUsername(newUsername);
  }

  const closeForm = () => {
    endGame();
    setDisplayForm(false);
  }

  const submitForm = () => {
    let database = "level-" + activeLevel + "-scores";

    // send info to firestore
    firestore.collection(database)
      .add({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        user: username,
        time: timeElapsed,
      });
    endGame();
    setDisplayForm(false);
  }

  // vars + function to fetch and store leaderboard data
  const [leaderboard1, setLeaderboard1] = useState();
  const [leaderboard2, setLeaderboard2] = useState();
  const [leaderboard3, setLeaderboard3] = useState();

  const [dataReady, setDataReady] = useState(false);

  const fetchResults = async () => {
    const level1Array = [];
    const level1Data = await firestore.collection("level-1-scores").orderBy("time", "asc").get();
    const level2Array = [];
    const level2Data = await firestore.collection("level-2-scores").orderBy("time", "asc").get();
    const level3Array = [];
    const level3Data = await firestore.collection("level-3-scores").orderBy("time", "asc").get();

    level1Data.forEach((doc) => {
      level1Array.push(doc.data());
    });
    setLeaderboard1(level1Array);

    level2Data.forEach((doc) => {
      level2Array.push(doc.data());
    });
    setLeaderboard2(level2Array);

    level3Data.forEach((doc) => {
      level3Array.push(doc.data());
    });
    setLeaderboard3(level3Array);

    setDataReady(true);
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
            fetchResults={fetchResults}
            leaderboard1={leaderboard1}
            leaderboard2={leaderboard2}
            leaderboard3={leaderboard3}
            dataReady={dataReady}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;