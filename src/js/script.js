import _ from "lodash";

let board = false;
let ballArray = [];
let ballIndex = 0;
const playerBoard = { val: [], dom: [], filled: [] };
const cpuBoard = { val: [], dom: [], filled: [] };

function getRandomArray(elements) {
  const array = _.shuffle(_.range(0, 90));
  array.splice(0, 90 - elements);
  return array;
}

function populateBoards() {
  playerBoard.val = getRandomArray(15);
  const playerDOMBoard = document.getElementsByClassName("player")[0].children[1];
  for (let i = 0; i < 15; i++) {
    const number = document.createElement("div");
    number.innerText = playerBoard.val[i];
    number.className = "number";
    playerDOMBoard.appendChild(number);
    playerBoard.dom[i] = number;
    playerBoard.filled[i] = false;
  }
  cpuBoard.val = getRandomArray(15);
  const cpuDOMBoard = document.getElementsByClassName("cpu")[0].children[1];
  for (let i = 0; i < 15; i++) {
    const number = document.createElement("div");
    number.innerText = cpuBoard.val[i];
    number.className = "number";
    cpuDOMBoard.appendChild(number);
    cpuBoard.dom[i] = number;
    cpuBoard.filled[i] = false;
  }
}

function startGame() {
  populateBoards();
  ballArray = getRandomArray(90);
  board = true;
}

function endGame() {
  board = false;
  document.getElementById("launch").disabled = true;
}

function checkVictory(array) {
  let temp = true;
  const arraylength = array.length;
  for (let i = 0; i < arraylength; i++) {
    temp = array[i] && temp;
    if (!temp) break;
  }
  return temp;
}

function launch() {
  if (board) {
    const element = document.getElementsByClassName("result")[0];
    const ball = ballArray[ballIndex];
    element.innerText = ball;
    // player:
    for (let i = 0; i < 15; i++) {
      if (playerBoard.val[i] === ball) {
        playerBoard.dom[i].classList.add("crosed");
        playerBoard.filled[i] = true;
      }
    }
    // cpu:
    for (let i = 0; i < 15; i++) {
      if (cpuBoard.val[i] === ball) {
        cpuBoard.dom[i].classList.add("crosed");
        cpuBoard.filled[i] = true;
      }
    }
    if (checkVictory(playerBoard.filled)) {
      // alert("Player WON!");
      document.getElementsByClassName("player")[0].classList.add("victory");
      endGame();
    } else if (checkVictory(cpuBoard.filled)) {
      // alert("CPU WON!");
      document.getElementsByClassName("cpu")[0].classList.add("victory");
      endGame();
    } else if (ballIndex === 89) endGame();
    ballIndex++;
  }
}

window.onload = startGame();

document.getElementById("launch").addEventListener("click", launch);
