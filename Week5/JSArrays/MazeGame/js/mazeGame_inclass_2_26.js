let maze = [
    [1, 1,  1, 1, 1],
    [1, 0,  0, 0, 1],
    [1, 0,   1, 0, 1],
    [1, "P", 1, "G", 1],
    [1, 1, 1, 1, 1 ]
];
let playerPos = { row: 3, col: 1 }; // ObjectLiteral
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") { movePlayer( -1, 0)}
    if (event.key === "ArrowDown") {  movePlayer( 1, 0)}
    if (event.key === "ArrowLeft") {  movePlayer( 0, -1)}
    if (event.key === "ArrowRight") {  movePlayer( 0, 1)}
});
function movePlayer(rowOffset, colOffset) {
        let newRow = playerPos.row + rowOffset;
        let newCol = playerPos.col + colOffset;
        if ( maze[newRow][newCol] !== 1 ){
            maze[playerPos.row][playerPos.col] = 0;
            playerPos.row = newRow;
            playerPos.col = newCol;
            maze[newRow][newCol] = "P";
            drawBoard();
            if (newRow === 3 && newCol === 3) {
                setTimeout( () => {
                    alert( "Winner Winner chicken dinner");
                    playerPos.col = 5;
                    playerPos.row = 5;
                }, 1000);
            }
        } else {
            alert( "Ouch!");
        }

}
function drawBoard(){
    const gameBoard = document.getElementById("gameBoard");
    // quick less on 2 dim
    // Row, col
    // let x = maze[0][1];
    // let row0Leng = maze[0].length;
    let ct =0;
    let oStr = "";
    gameBoard.innerHTML = "";
    // for( let row=0; row < maze.length; row++ ) {
    //     for( let col=0; col < maze[row].length; col++ ) {
    //         oStr += maze[row][col] + ",";
    //     }
    // }
       maze.forEach((row) => {
            row.forEach((col) => {
                let div = document.createElement("div");
                div.classList.add("cell");
                if ( col === 1 ){
                    div.classList.add("wall");
                } else if ( col === "P"){
                    div.classList.add("player");
                    div.textContent = "🤑";
                } else if ( col === "G" ){
                    div.classList.add("goal");
                    // div.textContent = "⛳";
                    div.textContent = String.fromCodePoint( 0x26F3);
                }
                gameBoard.appendChild(div);
            })
        })

    // alert( ct );
}