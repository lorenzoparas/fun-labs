
const whacAMole = document.getElementById("whac-a-mole");

let cabinet;
let scoreLabel;
let grid = STARTING_GRID;
let startButton;

let numClicked = 0;
let numTotal = 0;

let gameId;
let popdownId;

let difficultyInterval;

const main = () => init();

const init = () => {
    const difficultySelection = constructDifficultySelection();
    whacAMole.appendChild(difficultySelection);

    startButton = constructStartButton();
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
    disableDifficultyButtons();
    gameId = setInterval(() => {
        const randomEmptyCell = selectRandomEmptyCell();
        popupMole(randomEmptyCell);
        popdownId = setTimeout(() => popdownMole(randomEmptyCell), difficultyInterval);
    }, difficultyInterval);
};

const resetGame = () => {
    whacAMole.innerHTML = "";
    grid = STARTING_GRID;
    cabinet = undefined;
    difficultyInterval = undefined;
    
    numClicked = 0;
    numTotal = 0;

    clearInterval(gameId);
    gameId = undefined;

    clearPopdownTimeout();
    popdownId = undefined;

    init();
};

const constructDifficultySelection = () => {
    const difficultySelectionDiv = document.createElement("div");
    difficultySelectionDiv.id = "difficulty-selection";
    difficultySelectionDiv.textContent = "Select a difficulty: ";

    DIFFICULTIES.forEach(difficulty => {
        const difficultyButton = document.createElement("button");
    
        difficultyButton.className = "difficulty-button";
        difficultyButton.textContent = difficulty.name;
        difficultyButton.interval = difficulty.popupInterval;
        difficultyButton.addEventListener("click", () => {
            difficultyInterval = difficulty.popupInterval;
            startButton.disabled = false;
            updateDifficultyButtonsColor();
        });
    
        difficultySelectionDiv.appendChild(difficultyButton);
    });
    
    return difficultySelectionDiv;
};

const updateDifficultyButtonsColor = () => {
    const difficultyButtons = document.getElementsByClassName("difficulty-button");

    for (let iButton = 0; iButton < difficultyButtons.length; iButton++) {
        const currButton = difficultyButtons[iButton];
        currButton.style.backgroundColor = (currButton.interval === difficultyInterval) ? "red" : "grey";
    }
};

const disableDifficultyButtons = () => {
    const difficultyButtons = document.getElementsByClassName("difficulty-button");

    for (let iButton = 0; iButton < difficultyButtons.length; iButton++) {
        const currButton = difficultyButtons[iButton];
        currButton.disabled = true;
    }
}

const constructStartButton = () => {
    const startButton = document.createElement("button");
    startButton.textContent = "Start";
    startButton.disabled = true;
    startButton.addEventListener("click", startGame);
    return startButton;
};

const constructResetButton = () => {
    const startButton = document.createElement("button");
    startButton.textContent = "Reset";
    startButton.addEventListener("click", resetGame);
    return startButton;
};

const constructScoreLabel = () => {
    const scoreLabelDiv = document.createElement("span");
    scoreLabelDiv.id = "score"
    scoreLabelDiv.textContent = ` Score: ${ numClicked }/${ numTotal }`;
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
        if (cell.textContent === "" && cell.textContent !== "O") emptyCellPositions.push([rowNum, cellNum]);
    }));
    return emptyCellPositions;
};

const updateScore = () => scoreLabel.textContent = ` Score: ${ numClicked }/${ numTotal }`;

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
    cell.addEventListener("click", handleCellClick);    
};

const popdownMole = cell => {
    cell.textContent = "";
    cell.style.cursor = "auto";
    cell.removeEventListener("click", handleCellClick);

    numTotal++;
    updateScore();
};

main();
