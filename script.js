let boxes = document.querySelectorAll(".box");
let turnO = false;
let gameOver = false;
let winnerMessage = document.querySelector(".winner-message");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-game-btn");
let scoreNumbers = document.querySelectorAll(".score-number");
let status = document.querySelector(".status");
let scoreX = 0;
let scoreO = 0;
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

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                console.log("Winner:", pos1);
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner")
                boxes[pattern[2]].classList.add("winner");
                winnerMessage.innerText = `Player ${pos1} Wins!`;
                status.innerText = `Player ${pos1} Wins!`;
                if (pos1 === "X") {
                    scoreX++;
                    scoreNumbers[0].innerText = scoreX;
                } else {
                    scoreO++;
                    scoreNumbers[1].innerText = scoreO;
                }
                gameOver = true;
                return;

            }
        }
    }
};

const checkDraw = () => {
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled === true && gameOver === false) {
        winnerMessage.innerText = "It's a Draw!";
        status.innerText = "Game Draw!";
        gameOver = true;
    }
};

const resetGame = () => {
    turnO = false;
    gameOver = false;
    winnerMessage.innerText = "";
    status.innerText = "Player X's Turn";
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("x");
        box.classList.remove("o");
        box.classList.remove("winner");

    });

};

const newGame = () => {
    scoreX = 0;
    scoreO = 0;
    scoreNumbers[0].innerText = scoreX;
    scoreNumbers[1].innerText = scoreO;
    resetGame();

};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") {
            return;
        }

        if (gameOver === true) {
            return;
        }
        if (turnO === false) {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
            status.innerText = "Player O's Turn";

        } else {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
            status.innerText = "Player X's Turn";

        }


        checkWinner();
        checkDraw();

    });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", newGame);