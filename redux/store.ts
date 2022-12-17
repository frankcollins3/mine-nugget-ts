import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const {createStore} = require("redux")

const initState = {
    counter: 77,
    inplay: false,
    parents: '',
    winstreak: 0,
    wrongguess: 0
}
const gameReducer = (state=initState, action) => {
        if(action.type==="INCREMENT") {
        state.counter++
        return state
    }
    else if(action.type==="DECREMENT") {
        state.counter--
        return state
    }
    if (action.type === "PLAYING_GAME") {
        state.inplay = true
        return state
    }
    if (action.type === "NOT_PLAYING_GAME") {
        state.inplay = false
        return state
    }
    if (action.type === "SET_PARENTS") {
        if (state.parents === '') {
            state.parents = 'new parents'
        }
        else if (state.parents === 'new parents') {
            state.parents = ''        
        }
        // state.parents = ''
        return state
    }
    if (action.type === "WIN_STREAK") {
        state.winstreak++
        if (state.winstreak > 4) {
            state.winstreak = 0
        }
        return state
    }
    if (action.type === "RESET_WIN") {
        // if (state.winstreak === 3) {
            state.winstreak = 0
        // }
        return state
    }
    if (action.type === "WRONG_GUESS") {
        state.wrongguess++
        return state
    }
    if (action.type === "GUESS_RESET") {
        state.wrongguess = 0
        return state
    }

    else return state
}

const rootReducer = combineReducers({
    gameReducer,
})

const store = createStore(rootReducer)

export default store
