
const whacAMole = document.getElementById("whac-a-mole");

let cabinet;
let scoreDiv;
let grid = STARTING_GRID;

let numClicked = 0;
let numTotal = 0;

let gameId;
let popdownId;

const main = () => init();

const init = () => {
    const startButton = constructStartButton();
    whacAMole.appendChild(startButton);

    const resetButton = constructResetButton();
    whacAMole.appendChild(resetButton);

    scoreLabel = constructScoreLabel()
    whacAMole.appendChild(scoreLabel);

    cabinet = constructCabinet();
    whacAMole.appendChild(cabinet);
};

const startGame = () => {
    if (gameId) return;
    gameId = setInterval(() => {
        const randomEmptyCell = selectRandomEmptyCell();
        popupMole(randomEmptyCell);
        popdownId = setTimeout(() => popdownMole(randomEmptyCell), POPUP_INTERVAL_EASY);
    }, POPUP_INTERVAL_EASY);
};

const resetGame = () => {
    whacAMole.innerHTML = "";
    grid = STARTING_GRID;
    cabinet = undefined;
    scoreDiv = undefined;
    
    numClicked = 0;
    numTotal = 0;

    clearInterval(gameId);
    gameId = undefined;

    clearPopdownTimeout();
    popdownId = undefined;

    init();
};

const constructStartButton = () => {
    const startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.addEventListener('click', startGame);
    return startButton;
};

const constructResetButton = () => {
    const startButton = document.createElement("button");
    startButton.textContent = "Reset";
    startButton.addEventListener('click', resetGame);
    return startButton;
};

const constructScoreLabel = () => {
    const scoreLabelDiv = document.createElement("div");
    scoreLabelDiv.id = 'score'
    scoreLabelDiv.textContent = `Score: ${ numClicked }/${ numTotal }`;
    return scoreLabelDiv;
};

const constructCabinet = () => {
    const cabinetDiv = document.createElement("div");
    cabinetDiv.id = "cabinet";

    for (let currRow = 0; currRow < NUM_ROWS; currRow++) {
        const cabinetRowDiv = constructCabinetRow(currRow);
        cabinetDiv.appendChild(cabinetRowDiv);
    }

    return cabinetDiv;
};

const constructCabinetRow = (currRow) => {
    const cabinetRowDiv = document.createElement("div");
    cabinetRowDiv.className = "cabinet-row";

    for (let currCol = 0; currCol < NUM_COLS; currCol++) {
        const cabinetCellDiv = constructCabinetCell();
        grid[currRow][currCol] = cabinetCellDiv;
        cabinetRowDiv.appendChild(cabinetCellDiv);
    }

    return cabinetRowDiv;
};

const constructCabinetCell = () => {
    const cabinetCellDiv = document.createElement("div");
    cabinetCellDiv.className = "cabinet-cell";
    return cabinetCellDiv;
};

const selectRandomEmptyCell = () => {
    const emptyCellPositions = getEmptyCellPositions();
    const randomEmptyCellPosition = emptyCellPositions[Math.floor(Math.random() * emptyCellPositions.length)];
    return grid[randomEmptyCellPosition[ROW_INDEX]][randomEmptyCellPosition[COL_INDEX]];
};

const getEmptyCellPositions = () => {
    let emptyCellPositions = [];
    grid.forEach((row, rowNum) => row.forEach((cell, cellNum) => {
        if (cell.textContent === '' && cell.textContent !== 'O') emptyCellPositions.push([rowNum, cellNum]);
    }));
    return emptyCellPositions;
};

const updateScore = () => scoreLabel.textContent = `Score: ${ numClicked }/${ numTotal }`;

const clearPopdownTimeout = () => clearTimeout(popdownId);

const handleCellClick = event => {
    const cell = event.target;
    popdownMole(cell);
    clearPopdownTimeout();

    numClicked++;
    updateScore();
}

const popupMole = cell => {
    cell.style.cursor = "pointer";
    cell.textContent = "O";
    cell.addEventListener('click', handleCellClick);    
};

const popdownMole = cell => {
    cell.textContent = "";
    cell.style.cursor = "auto";
    cell.removeEventListener('click', handleCellClick);

    numTotal++;
    updateScore();
};

main();
