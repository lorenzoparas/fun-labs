
const rockPaperScissors = document.getElementById("rock-paper-scissors");
let selectionScreen;
let userWeapon;
let cpuWeapon;

const main = () => {
    init();
};

const init = () => {
    selectionScreen = constructSelectionScreen();
    rockPaperScissors.appendChild(selectionScreen);
};

const constructSelectionScreen = () => {
    const selectionScreenDiv = document.createElement("div");
    selectionScreenDiv.id = "selection-screen";

    const selectionScreenHeading = constructSelectionScreenHeading();
    selectionScreenDiv.appendChild(selectionScreenHeading);

    const weaponSelectionDiv = constructWeaponSelection();
    selectionScreenDiv.appendChild(weaponSelectionDiv);

    return selectionScreenDiv
};

const constructSelectionScreenHeading = () => {
    const selectionScreenHeading = document.createElement("h2");
    selectionScreenHeading.textContent = "Choose a weapon!";
    return selectionScreenHeading
};

const constructWeaponSelection = () => {
    const weaponSelectionDiv = document.createElement("div");
    weaponSelectionDiv.id = "weapon-selection";
    WEAPONS.forEach(weapon => {
        const weaponBox = constructWeaponBox(weapon);
        weaponSelectionDiv.appendChild(weaponBox);
    });
    return weaponSelectionDiv
};

const constructWeaponBox = weapon => {
    const weaponBoxDiv = document.createElement("h3");
    weaponBoxDiv.className = "weapon-box";
    weaponBoxDiv.textContent = weapon
    weaponBoxDiv.addEventListener("click", async () => {
        selectionScreen.style.display = "none";
        userWeapon = weapon;
        cpuWeapon = chooseRandomWeapon();
        await playRockPaperScissorsAnimation();
        displayResult();
    });
    return weaponBoxDiv
};

const chooseRandomWeapon = () => WEAPONS[Math.floor(Math.random() * WEAPONS.length)];

const sleep = ms => new Promise(r => setTimeout(r, ms));

const playRockPaperScissorsAnimation = async () => {
    const animationText = document.createElement("h1");
    rockPaperScissors.appendChild(animationText);

    animationText.textContent = "Rock...";
    await sleep(500);
    animationText.textContent = "Paper...";
    await sleep(500);
    animationText.textContent = "Scissors...";
    await sleep(500);
    animationText.textContent = "Shoot!";
    await sleep(500);

    animationText.style.display = "none";
};

const displayResult = () => {
    const resultScreen = document.createElement("div");
    const result = calculateResult();

    const resultText = constructResultText(result);
    resultScreen.appendChild(resultText);

    const userSelectionText = constructUserSelectionText();
    resultScreen.appendChild(userSelectionText);

    const cpuSelectionText = constructCpuSelectionText();
    resultScreen.appendChild(cpuSelectionText);

    const playAgainButton = constructPlayAgainButton();
    resultScreen.appendChild(playAgainButton);
    
    rockPaperScissors.appendChild(resultScreen);
};

const constructResultText = (result) => {
    const resultText = document.createElement("h1");
    resultText.textContent = `You ${ result }!`;
    resultText.style.color = result === WIN_RESULT ? "lime" : result === LOSS_RESULT ? "red" : "black"
    return resultText;
};

const constructUserSelectionText = () => {
    const userSelectionText = document.createElement("h2");
    userSelectionText.textContent = `You chose: ${ userWeapon }`;
    return userSelectionText;
};

const constructCpuSelectionText = () => {
    const cpuSelectionText = document.createElement("h2");
    cpuSelectionText.textContent = `The CPU chose: ${ cpuWeapon }`;
    return cpuSelectionText;
};

const calculateResult = () => {
    if (checkTie()) return TIE_RESULT;
    if (checkWin()) return WIN_RESULT;
    if (checkLoss()) return LOSS_RESULT;
};

const checkTie = () => userWeapon === cpuWeapon;

const checkWin = () => (
    userWeapon === ROCK && cpuWeapon === SCISSORS
    || userWeapon === PAPER && cpuWeapon === ROCK
    || userWeapon === SCISSORS && cpuWeapon === PAPER
);

const checkLoss = () => (
    userWeapon === SCISSORS && cpuWeapon === ROCK
    || userWeapon === ROCK && cpuWeapon === PAPER
    || userWeapon === PAPER && cpuWeapon === SCISSORS
);

const constructPlayAgainButton = () => {
    const playAgainButtonDiv = document.createElement("div");
    playAgainButtonDiv.id = "play-again-button"
    playAgainButtonDiv.textContent = "Play Again"
    playAgainButtonDiv.addEventListener("click", () => {
        rockPaperScissors.innerHTML = "";
        init();
    });
    return playAgainButtonDiv;
};

main();
