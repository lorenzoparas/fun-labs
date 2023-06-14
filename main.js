
const main = () => {
    init();
};

const init = () => {
    const gamesGrid = document.getElementById('games-grid');

    games.forEach(game => {
        const gameCell = constructGameCell(game);
        gamesGrid.appendChild(gameCell);
    });
};

const constructGameCell = (game) => {
    const gameCellDiv = document.createElement('div');
    const gameNameTextNode = document.createTextNode(game.name);

    gameCellDiv.className = 'game-cell';
    gameCellDiv.appendChild(gameNameTextNode);

    const gameCellLink = document.createElement('a');
    gameCellLink.href = `games/${game.alias}/${game.alias}.html`;
    gameCellLink.appendChild(gameCellDiv);

    return gameCellLink;
};

main();
