
const notScaryMazeGame = document.getElementById("not-scary-maze-game");
const loseAudio = new Audio(LOSE_AUDIO_URL);
let maze;
let playButton;

const main = () => {
    init();
};

const init = () => {
    playButton = constructPlayButton();
    notScaryMazeGame.appendChild(playButton);
    maze = constructMaze();
    notScaryMazeGame.appendChild(maze);
};

const displayGameResult = (result) => {
    notScaryMazeGame.style.backgroundImage = result === GAME_WIN ? WIN_PHOTO_URL : LOSS_PHOTO_URL;
    notScaryMazeGame.style.backgroundSize = "cover";
    notScaryMazeGame.style.backgroundPosition = "right";
    maze.style.display = "none";
    if (result !== GAME_WIN) loseAudio.play();
};

const constructMaze = () => {
    const mazeDiv = document.createElement("div");
    mazeDiv.id = "maze";

    WALL_PROPERTIES.forEach(wallProperty => {
        const wall = constructWall(wallProperty);
        mazeDiv.appendChild(wall);
    });

    const finishBox = constructFinishBox();
    mazeDiv.appendChild(finishBox);

    return mazeDiv
};

const constructFinishBox = () => {
    const finishBox = document.createElement("div");

    finishBox.id = "finish-box";
    finishBox.addEventListener("mouseover", () => displayGameResult(GAME_WIN));

    return finishBox;
};

const constructWall = (wallProperty) => {
    const wall = document.createElement("div");

    wall.className = "wall"
    wall.style.width = wallProperty.width;
    wall.style.height = wallProperty.height;
    wall.style.left = wallProperty.left;
    wall.style.top = wallProperty.top;
    wall.style.border = wallProperty.debug && "2px solid red";
    wall.addEventListener("mouseover", () => displayGameResult(GAME_LOSS));

    return wall;
}

const constructPlayButton = () => {
    const playButtonDiv = document.createElement("div");

    playButtonDiv.id = "play-button"
    playButtonDiv.textContent = "PLAY";
    playButtonDiv.addEventListener("click", () => {
        maze.style.display = "block";
    });

    return playButtonDiv;
};

main();
