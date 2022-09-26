import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
// console.log(board.grid);

// Your code here
const makeDiv = (className) => {
    const div = document.createElement("div");
    div.className = className;
    return div;
}

const makeP = (className) => {
    const p = document.createElement("p");
    p.className = className;
    return p;
}

const winOrReset = makeDiv("winOrReset");

const winnerMsg = makeP("winner");
const button = document.createElement("button");
button.innerText = "Reset Game";

winOrReset.appendChild(winnerMsg);
winOrReset.appendChild(button);

winnerMsg.innerText = "You Win!!";
winnerMsg.style.visibility = "hidden";
document.body.appendChild(winOrReset);


const wrapperDiv = makeDiv("wrapper");
document.body.appendChild(wrapperDiv);


const makeBlock = (row, col) => {
    const div = makeDiv("block")
    div.setAttribute("data-row", row);
    div.setAttribute("data-col", col);
    wrapperDiv.appendChild(div);
}

for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        makeBlock(row, col);
    }
}

let marked = {};

const reset = e => {
    document.addEventListener('click', clicks);
    winnerMsg.style.visibility = "hidden";
    board = new Board();
    marked = {};

    let blocks = document.body.getElementsByClassName("block");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#8fb1e9";
    }

    let p = document.body.getElementsByClassName("text");
    for (let i = 0; i < p.length; i++) {
        p[i].innerText = "";
    }
}

const clicks = e => {
    const target = e.target;
    const row = target.dataset.row;
    const col = target.dataset.col;
    if (row && col) {
        if (!marked[[row, col]]) {
            marked[[row, col]] = true;
            const hit = board.makeHit(row, col);
            if (hit) {
                const p = makeP("text");
                p.innerText = hit;
                target.children.length === 0 ? target.appendChild(p) : target.children[0].innerText = hit;
                target.style.backgroundColor = "#7dd87d";
            } else {
                target.style.backgroundColor = "#f96d6d";
            };
        };
        if (board.numRemaining === 0) {
            document.removeEventListener('click', clicks);
            winnerMsg.style.visibility = "visible";
            winnerMsg.innerText = "You Win!!";
        };
    }
}

window.document.addEventListener("DOMContentLoaded", event => {
    document.addEventListener('click', clicks);
    button.addEventListener('click', reset);
});
