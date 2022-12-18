import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'

const {createStore} = require("redux")

const initState = {
    counter: 77,
    inplay: false,
    parents: '',
    winstreak: 0,
    wrongguess: 0
}
const gameReducer = (state=initState, action) => {
        if(action.type === "INCREMENT") {
        console.log('state from the increment')
        console.log(state)
        state.counter++
        return state
        // return state.counter
    }
    else if(action.type === "DECREMENT") {
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
                state.parents = action.payload.parents
                return state        
    }
    if (action.type === "CLEAR_PARENTS") {
            state.parents = ''
            return state
    }
    // return action.type === "SET_PARENTS" ? action.payload.parents : 'hey';

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
