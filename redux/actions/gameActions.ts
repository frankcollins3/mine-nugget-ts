//Action Types
// export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
// export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

const PLAYING_GAME = "PLAYING_GAME"
const NOT_PLAYING_GAME = "NOT_PLAYING_GAME"

// Action Creators

export const playingGame = () => {
    type: PLAYING_GAME
}

export const notPlayingGame = () => {
    type: NOT_PLAYING_GAME
}

