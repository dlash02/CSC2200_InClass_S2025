const maze = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, "P", 1, "G", 1],
    [1, 1, 1, 1, 1]
];
let playerPos = { row: 3, col: 1 };  // Initial player position
function drawBoard() {
    const gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = "";
    maze.forEach((row, rIndex) => {
        row.forEach((cell, cIndex) => {
            let div = document.createElement("div");
            div.classList.add("cell");

            if (cell === 1) div.classList.add("wall");
            else if (cell === "P") div.classList.add("player"), div.textContent = "😊";
            else if (cell === "G") div.classList.add("goal"), div.textContent = "🏁";

            gameBoard.appendChild(div);
        });
    });
}
function movePlayer(rowOffset, colOffset) {
    let newRow = playerPos.row + rowOffset;
    let newCol = playerPos.col + colOffset;

    // Check if the move is within bounds and not a wall
    if (maze[newRow][newCol] !== 1) {
        // Move player
        maze[playerPos.row][playerPos.col] = 0;  // Clear old position
        playerPos.row = newRow;
        playerPos.col = newCol;
        maze[newRow][newCol] = "P";  // Update new position

        drawBoard();
        if (newRow === 3 && newCol === 3) {
            setTimeout(() => alert("You win! 🎉 🙌" + String.fromCodePoint(0x1F602)), 100);
        }
    }
}
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") movePlayer(-1, 0);
    if (event.key === "ArrowDown") movePlayer(1, 0);
    if (event.key === "ArrowLeft") movePlayer(0, -1);
    if (event.key === "ArrowRight") movePlayer(0, 1);
});
