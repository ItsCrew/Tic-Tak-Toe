let player1 = "Player 1";
let player2 = "Player 2";
let currentPlayer = "X";
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newgamebtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".win-container");
let msg = document.querySelector(".msg");
const header = document.querySelector("header");
const main = document.querySelector("main");

let turnO = false;
let count = 0;

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const setPlayerNames = () => {
  const Player1 = document.querySelector("#player1").value;
  const Player2 = document.querySelector("#player2").value;

  if (Player1) {
    player1 = Player1;
  }

  if (Player2) {
    player2 = Player2;
  }

  document.querySelector("#player1-display").textContent = player1;
  document.querySelector("#player2-display").textContent = player2;
  header.style.display = "none";
  main.style.display = "block";
  updatedisplay();
};

const updatedisplay = () => {
  let curplayer = document.querySelector("#current-player");
  curplayer.textContent = `Current Player = ${
    currentPlayer === "X" ? player1 : player2
  }`;
};

const resetGame = () => {
  turnO = false;
  currentPlayer = "X";
  count = 0;
  enablebox();
  msgcontainer.classList.add("hide");
  main.style.display = "block";
  updatedisplay();
};

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    if (event.target.innerText === "") {
      if (!turnO) {
        event.target.innerText = "X";
        event.target.style.color = "red";
        currentPlayer = "O";
      } else {
        event.target.innerText = "O";
        event.target.style.color = "green";
        currentPlayer = "X";
      }
      turnO = !turnO;
      count++;

      let won = checkWinner();

      if (count === 9 && !won) {
        draw();
      }
      updatedisplay();
    }
  });
});

const disablebox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enablebox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const draw = () => {
  msg.innerText = "Game was a draw";
  msgcontainer.classList.remove("hide");
  main.style.display = "none";
  disablebox();
};

const showWinner = (winner) => {
  const winnerName = winner === "X" ? player1 : player2;
  msg.innerText = `Congratulations ${winnerName}, You won!`;
  msgcontainer.classList.remove("hide");
  disablebox();
};

const checkWinner = () => {
  for (let pattern of winpatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("Winner", pos1val);
        showWinner(pos1val);
        main.style.display = "none";
      }
    }
  }
};

newgamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

document.addEventListener("DOMContentLoaded", () => {
  updatedisplay();
});
