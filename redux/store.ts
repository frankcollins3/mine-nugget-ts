import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const {createStore} = require("redux")

const initState = {
    counter: 77,
    inplay: false
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

    else return state
}

const rootReducer = combineReducers({
    gameReducer,
})

const store = createStore(rootReducer)

export default store
