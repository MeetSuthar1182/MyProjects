let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let newGame = document.querySelector("#new-game");
let rstGame = document.querySelector("#Reset");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.textContent = "";
        box.style.borderColor = "#fff";
        box.style.boxShadow = `
        0 0 5px #fff,
        0 0 10px #fff`;
        msg.innerText = "This is the tic tac toe game!";
    }
}

const checkDraw = () => {
    msg.textContent = "This is the draw";
}
for (let elements of boxes) {
    elements.addEventListener('click', () => {
        if (turnO) {
            elements.textContent = 'O';
            turnO = false;
            elements.style.color = "#FF073A";
            elements.style.textShadow = `0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #FF073A,
        0 0 20px #FF073A,
        0 0 35px #FF073A,
        0 0 40px #FF073A,
        0 0 50px #FF073A,
        0 0 75px #FF073A`;
        } else {
            elements.textContent = 'X';
            turnO = true;
            elements.style.color = "#00BFFF";
            elements.style.textShadow = `0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #00BFFF,
        0 0 20px #00BFFF,
        0 0 35px #00BFFF,
        0 0 40px #00BFFF,
        0 0 50px #00BFFF,
        0 0 75px #00BFFF`;
        }
        elements.disabled = true;
        count++;

        let isWinner = !checkWinner();

        if (count === 9 && isWinner) {
            checkDraw();
        }

        checkWinner();
    })
}

boxes.forEach((box) => {

  box.addEventListener("mouseenter", () => {

    if (turnO) {
      // O turn → RED hover
      box.style.borderColor = "#FF073A";
      box.style.boxShadow = `
        0 0 5px #fff,
        0 0 10px #FF073A`;
    } else {
      // X turn → BLUE hover
      box.style.borderColor = "#00BFFF";
      box.style.boxShadow = `
        0 0 5px #fff,
        0 0 10px #00BFFF`;
    }
  });

  box.addEventListener("mouseleave", () => {

    box.style.borderColor = "#fff";
    box.style.boxShadow = `
      0 0 5px #fff,
      0 0 10px #fff`;
  });

});


const showWinner = (winner) => {
    msg.innerText = `congrats! winner is ${winner}`;
    disableBox();
}

const gameRst = () => {
    enableBox();
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].textContent;
        let pos2val = boxes[pattern[1]].textContent;
        let pos3val = boxes[pattern[2]].textContent;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true;
            }
        }
    }
}

rstGame.addEventListener('click', gameRst);
newGame.addEventListener('click', gameRst);