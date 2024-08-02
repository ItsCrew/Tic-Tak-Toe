let player1 = "Player 1";
let player2 = "Player 2";
let currentPlayer = "X";
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newgamebtn = document.querySelector(".new-btn");
let msgcontainer = document.querySelector(".win-container");
let msg = document.querySelector(".msg");

let turnO = true;
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
  updatedisplay();
};

const updatedisplay = () => {
  let curplayer = document.querySelector("#current-player");
  curplayer.textContent = `Current Player = ${
    currentPlayer === "X" ? player1 : player2
  }`;
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enablebox();
  msgcontainer.classList.add("hide");
  updatedisplay();
};

boxes.forEach((box) => {
  box.addEventListener("click", (event) => {
    if (event.target.innerText === "") {
      if (turnO) {
        event.target.innerText = "O";
        event.target.style.color = "green";
        currentPlayer = "X";
      } else {
        event.target.innerText = "X";
        event.target.style.color = "red";
        currentPlayer = "O";
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
  disablebox();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
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
        console.log("WINNER", pos1val);
        showWinner(pos1val);
      }
    }
  }
};

newgamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

document.addEventListener("DOMContentLoaded", () => {
  updatedisplay();
});
