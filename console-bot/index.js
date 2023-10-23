require('dotenv').config();
require('colors');
const forgetPlayer = require('./services/ForgetPlayer');
const registerFunc = require('./services/RegisterPlayer');

let playerInfo = {};
let mazeList = [];
let enteredMazes = [];
let isInMaze = false;
let potentialScoreInMaze = 0;
let oppositeDirections = {
  Up: { opposite: 'Down' },
  Down: { opposite: 'Up' },
  Left: { opposite: 'Right' },
  Right: { opposite: 'Left' },
};
let scoreInHand = 0;
let location = {};
let direction = '';
let lastDirection = '';
let currentMazeName = '';
let collectedScoresInMaze = [];
let lastExitPath = [];
let pathToStart = [];
let isExitFound = false;
let timeToExit = false;
let isAllVisited = false;
let isScoreCollectionPointFound = false;
let lastScoreCollectionPath = [];

const getPlayerInfo = async () => {
  await fetch(`${process.env.API_BASE}/player`, {
    method: 'GET',
    headers: { Authorization: process.env.TOKEN },
  })
    .then((res) => {
      if (res.status == 200) {
        console.log(`Here is your infos ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      playerInfo = data;
      isInMaze = playerInfo.isInMaze;
      console.log(playerInfo, 'deneme');
    })
    .catch((error) => {
      console.log(error);
      console.log('You should register first, we are going to register'.yellow);
    });
};

const getMazeList = async () => {
  console.log('Getting maze list..'.cyan);
  await fetch(`${process.env.API_BASE}/mazes/all`, {
    method: 'GET',
    headers: { Authorization: process.env.TOKEN },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      console.log('We are done, here is the maze list');
      mazeList = data;
      console.log(mazeList);
    })
    .catch((error) => console.error(error));
};

const enterTheMaze = async (mazeName) => {
  console.log(`Entering the maze.. ${mazeName}`.cyan);
  let currentMaze = mazeList.find((el) => el.name === mazeName);
  console.log('The current maze is', currentMaze, currentMaze.potentialReward);
  potentialScoreInMaze += currentMaze.potentialReward;
  currentMazeName = mazeName;
  enteredMazes = [...enteredMazes, currentMaze];
  console.log(
    `You are entering the maze ${currentMazeName} and the potential reward is ${potentialScoreInMaze}`
  );

  await fetch(`${process.env.API_BASE}/mazes/enter?mazeName=${mazeName}`, {
    method: 'POST',
    headers: {
      Authorization: process.env.TOKEN,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      location = data;
      isInMaze = true;
      console.log('You are in the maze right now..'.green);
    })
    .catch((error) => console.error(error));
};

const getPossinleMoveActions = async () => {
  await fetch(`${process.env.API_BASE}/maze/possibleActions`, {
    method: 'GET',
    headers: {
      Authorization: process.env.TOKEN,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      location = data;
      console.log('We got possible actions in here:', location);
    })
    .catch((error) => console.error(error));
};

const exitMaze = async () => {
  console.log('Exiting the maze, get ready for the new maze'.blue);
  await fetch(`${process.env.API_BASE}/maze/exit`, {
    method: 'POST',
    headers: {
      Authorization: process.env.TOKEN,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        potentialScoreInMaze = 0;
        location = {};
        currentMazeName = '';
        collectedScoresInMaze = [];
        lastExitPath = [];
        pathToStart = [];
        isExitFound = false;
        isScoreCollectionPointFound = false;
        lastScoreCollectionPath = [];
        isInMaze = false;

        console.log('Maze exited'.red);
      }
    })
    .catch((error) => console.error(error));
};

const collectScore = async () => {
  console.log('Collecting score');
  await fetch(`${process.env.API_BASE}/maze/collectScore`, {
    method: 'POST',
    headers: {
      Authorization: process.env.TOKEN,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(
        `You have added ${scoreInHand} score to your bag and you have ${
          data.currentScoreInBag
        } in your bag. ${
          potentialScoreInMaze - data.currentScoreInBag
        } scores left to collect all scores in maze.`.green
      );
      scoreInHand = 0;
      if (data.currentScoreInBag === potentialScoreInMaze) {
        console.log('You have got all scores in maze. Time to exit!'.yellow);
        timeToExit = true;
      }
      location = data;
    })
    .catch((error) => console.error(error));
};

const setMove = async () => {
  let foundDirectionInCondition = false;
  let foundDirectionInLoop = false;
  let allDirections = [...location.possibleMoveActions];
  isAllVisited = location.possibleMoveActions.every(
    (el) => el.hasBeenVisited === true
  );
  let chooseBestOption = () => {
    console.log('trying to find the best option'.yellow);
    console.log('in all options', allDirections);
    // filtered the last direction now we need to go to best direction
    allDirections.forEach((el) => {});
    for (let i = 0; i < allDirections.length; i++) {
      if (
        allDirections[i].direction === lastDirection &&
        allDirections[i].rewardOnDestination > 0 &&
        !allDirections[i].hasBeenVisited
      ) {
        direction = allDirections[i].direction;
        console.log(
          'We are going to same direction we went before until found is visited'
        );
        foundDirectionInLoop = true;
        break;
      }
      if (allDirections[i].rewardOnDestination > 0) {
        direction = allDirections[i].direction;
        console.log('We need to got this way because we get score!'.yellow);
        foundDirectionInLoop = true;
        break;
      } else if (
        allDirections[i].allowsExit &&
        potentialScoreInMaze === location.currentScoreInBag
      ) {
        console.log('Okay time to exit'.green);
        direction = allDirections[i].direction;
        foundDirectionInLoop = true;
        break;
      } else if (!allDirections[i].hasBeenVisited) {
        console.log("We haven't been in direction before, let's go.".green);
        direction = allDirections[i].direction;
        foundDirectionInLoop = true;
        break;
      }
    }
  };
  // if exit path available and we collect the all score, we should exit now
  if (isExitFound && timeToExit) {
    console.log('Okay time to exit'.green);
    direction = lastExitPath.shift();
    foundDirectionInCondition = true;
  }

  // if we have all score but some of them in our hands we should go and collect our scores if we have path
  if (
    isScoreCollectionPointFound &&
    scoreInHand + location.currentScoreInBag === potentialScoreInMaze &&
    lastScoreCollectionPath.length > 0 &&
    !timeToExit
  ) {
    console.log("It's time to collect scores".yellow);
    direction = lastScoreCollectionPath.shift();
    foundDirectionInCondition = true;
  }

  // if there is only one direction we go there
  if (location.possibleMoveActions.length === 1) {
    console.log('There is only one move so we go there'.yellow);
    direction = location.possibleMoveActions[0].direction;
    foundDirectionInCondition = true;
  }
  // If all directions are visited we need to go back and explore new directions, when we find points we can stop and explore again
  if (
    isAllVisited === true &&
    pathToStart.length > 0 &&
    !timeToExit &&
    scoreInHand + location.currentScoreInBag !== potentialScoreInMaze
  ) {
    console.log(
      "It's time to go back and explore other ways we haven't been before"
        .yellow
    );
    direction = pathToStart.shift();
    foundDirectionInCondition = true;
  }

  // if we couldn't find any direction in conditions above we will try in the loop
  if (!foundDirectionInCondition) {
    chooseBestOption();
  }

  // if we couldn't find any directions in our loop and in conditions we will go random direction
  if (!foundDirectionInLoop && !foundDirectionInCondition) {
    console.log("couldn't find the best match going with random direction".red);
    let randomDirection = Math.floor(Math.random() * allDirections.length);
    direction = allDirections[randomDirection].direction;
    console.log(`Random option selected: ${randomDirection}`);
  }
};

const toggleMovement = async () => {
  await setMove();
  console.log(`Going on direction ${direction}`);
  if (isExitFound && location.currentScoreInBag !== potentialScoreInMaze) {
    lastExitPath.unshift(oppositeDirections[direction].opposite);
  }
  if (
    isScoreCollectionPointFound &&
    scoreInHand + location.currentScoreInBag !== potentialScoreInMaze
  ) {
    lastScoreCollectionPath.unshift(oppositeDirections[direction].opposite);
  }
  if (!isAllVisited) {
    pathToStart.unshift(oppositeDirections[direction].opposite);
  }

  await fetch(`${process.env.API_BASE}/maze/move?direction=${direction}`, {
    method: 'POST',
    headers: {
      Authorization: process.env.TOKEN,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      location = data;
      scoreInHand = data.currentScoreInHand;
      lastDirection = direction;
      if (location.canExitMazeHere) {
        isExitFound = true;
      }
      if (location.canCollectScoreHere) {
        isScoreCollectionPointFound = true;
      }
      if (location.canExitMazeHere && lastExitPath.length > 0) {
        lastExitPath = [];
      }
      if (location.canCollectScoreHere && lastScoreCollectionPath.length > 0) {
        lastScoreCollectionPath = [];
      }
      if (location.currentScoreInBag === potentialScoreInMaze) {
        timeToExit = true;
      }
    })
    .catch((error) => console.error(error));
};

const giveDelay = async () => {
  console.log('Loading');
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const mazeLoop = async () => {
  // await forgetPlayer();
  // await registerFunc();
  console.log('start');
  await getMazeList();
  for (let i = 0; i < mazeList.length; i++) {
    await enterTheMaze(mazeList[i].name);
    // we wil loop over the mazes todos:
    if (!location.possibleMoveActions) {
      await getPossinleMoveActions();
    }
    console.log('here is your location', location);
    let turn = 0;
    do {
      if (location.canExitMazeHere && timeToExit) {
        await exitMaze();
      } else if (location.canCollectScoreHere && scoreInHand > 0) {
        await collectScore();
        console.log('Scores were collected'.green);
      }
      await giveDelay();
      console.log('possible directions:', location.possibleMoveActions);
      console.log(
        `You have ${location.currentScoreInHand} score in your hand and ${
          location.currentScoreInBag
        } in bag. Still ${
          potentialScoreInMaze - location.currentScoreInBag
        } to put your bag.`
      );
      await toggleMovement();
      console.log(`It's the ${turn} direction you went`);
      turn++;
    } while (isInMaze);
  }
};

mazeLoop();
