const player1 = "Player 1";
const player2 = "Player 2";
const currentPlayer = "X";
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset-btn");
const newgamebtn = document.querySelector(".new-btn");
const msgcontainer = document.querySelector(".win-container");
const msg = document.querySelector(".msg");

const turnO = true;
const count = 0;

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
  const curplayer = document.querySelector("#current-player");
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

      const won = checkWinner();

      if (count === 9 && !won) {
        draw();
      }
      updatedisplay();
    }
  });
});

const disablebox = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

const enablebox = () => {
  for (const box of boxes) {
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
  for (const pattern of winpatterns) {
    const pos1val = boxes[pattern[0]].innerText;
    const pos2val = boxes[pattern[1]].innerText;
    const pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("WINawawdawdNER", pos1val);
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
