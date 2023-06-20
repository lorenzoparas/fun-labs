
const NUM_ROWS = 4;
const NUM_COLS = 4;

const ROW_INDEX = 0;
const COL_INDEX = 1;

const POPUP_INTERVAL_EASY = 800;
const POPUP_INTERVAL_MEDIUM = 650;
const POPUP_INTERVAL_HARD = 500;

const DIFFICULTIES = [
    { name: "Easy", popupInterval: POPUP_INTERVAL_EASY },
    { name: "Medium", popupInterval: POPUP_INTERVAL_MEDIUM },
    { name: "Hard", popupInterval: POPUP_INTERVAL_HARD }
];

const STARTING_GRID = [...Array(NUM_ROWS)].map(() => Array(NUM_COLS).fill(''));
