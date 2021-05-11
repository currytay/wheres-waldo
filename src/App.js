import React, { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Routes from "./components/Routes";
import "./styles/App.css";
import Waldo from "./assets/waldo.jpg";
import Wenda from "./assets/wenda.jpg";
import Odlaw from "./assets/odlaw.jpg";
import Wizard from "./assets/wizard.jpg";
import firebase from "firebase/app";
import { addTestData, firestore, getValidCoordinates } from "./Firebase";

function App() {

  const [game, setGame] = useState(false);

  const startGame = () => {
    setGame(true);
    setStartTime(Date.now());
  }

  const endGame = () => {
    setGame(false);
    setLevelDisplayed(1);
    setGuessActive(false);
    setCharactersFound(0);
  }

  // track valid coords for each character
  const [waldoCoords, setWaldoCoords] = useState([]);
  const [wendaCoords, setWendaCoords] = useState([]);
  const [odlawCoords, setOldawCoords] = useState([]);
  const [wizardCoords, setWizardCoords] = useState([]);

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
    // docRef.get().then((doc) => {
    //   let results = doc.data();
    //   let xRes = results.xCoords;
    //   let yRes = results.yCoords;
    //   testCoords = xRes;
    //   setTempX(xRes);
    //   setTempY(yRes);
    // });
  }

  const [activeLevel, setActiveLevel] = useState(null);
  const [characters, setCharacters] = useState([]);

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
  const [xCoordsGuess, setXCoordsGuess] = useState();
  const [yCoordsGuess, setYCoordsGuess] = useState();

  const getCoordinates = (event) => {
    let percentX = ((event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100).toFixed(0);
    let percentY = ((event.nativeEvent.offsetY / event.currentTarget.offsetHeight) * 100).toFixed(0);
    console.log(percentX, percentY);
    setCoords({ x: percentX, y: percentY });
    setXCoordsGuess(percentX);
    setYCoordsGuess(percentY);
    setGuessActive(true);
  }

  const [levelDisplayed, setLevelDisplayed] = useState(1);

  const toggleLevel = (event) => {
    let levelID = event.currentTarget.id;
    let levelNum = parseInt(levelID.slice(-1));
    setLevelDisplayed(levelNum);
  }

  const [tempX, setTempX] = useState([]);
  const [tempY, setTempY] = useState([]);

  const checkForMatch = (event) => {
    let selectedCharacter = event.target.id;
    compareCoords(selectedCharacter);
    setGuessActive(false);
  }

  const getResults = (name) => {
    let docRef = firestore.collection(`"level-1"`).doc(name);
    let testCoords;
  
    docRef.get().then((doc) => {
      let results = doc.data();
      let xRes = results.xCoords;
      let yRes = results.yCoords;
      testCoords = xRes;
      setTempX(xRes);
      setTempY(yRes);
    });
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
      console.log("match!");
      let currentCharacters = [...characters];
      currentCharacters[indexValue].found = true;
      setCharacters([...currentCharacters]);
      setCharactersFound(charactersFound + 1);
      displaySuccess();
    } else {
      console.log("no match :(");
      displayError();
    }
  }

  // create variable to display error message if size not selected
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

  const [successMessage, setSuccessMessage] = useState({
    show: false,
  });

  const displaySuccess = () => {
    if (!errorMessage.show) {
      setSuccessMessage((prev) => ({ ...prev, show: true })); // show error
      setTimeout(() => {
        setSuccessMessage((prev) => ({ ...prev, show: false })); // hide error
      }, 2000);
    }
  }

  const [charactersFound, setCharactersFound] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState();

  const checkCompletion = () => {
    if (charactersFound ===  characters.length) {
      console.log("complete!");
      setDisplayForm(true);
      let endTime = Date.now();
      setTimeElapsed((endTime - startTime) / 1000);
    } else {
      console.log("almost there");
      return;
    }
  }

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

  const [startTime, setStartTime] = useState();

  const [leaderboard1, setLeaderboard1] = useState();
  const [leaderboard2, setLeaderboard2] = useState();
  const [leaderboard3, setLeaderboard3] = useState();

  // // const fetchResults = () => {
  // //   let level2Scores = firestore.collection("level-2-scores");
  // //   let leaderboardArray = [];

  // //   level2Scores.orderBy("time", "asc").get().then((querySnapshot) => {
  // //     querySnapshot.forEach((doc) => {
  // //         // doc.data() is never undefined for query doc snapshots
  // //         // console.log(doc.data());
  // //         leaderboardArray.push(doc.data());
  // //         console.log(leaderboardArray);
  // //     });
  // // });

  // const fetffchResults = () => {
  //   let level2Scores = firestore.collection("level-2-scores");
  //   let leaderboardArray = [];

  //   level2Scores.orderBy("time", "asc").get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       leaderboardArray.push(doc.data());
  //     })
  //   })
  //   setLeaderboard2([...leaderboardArray]);
  // }

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
