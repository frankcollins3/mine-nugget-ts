import { configureStore } from '@reduxjs/toolkit'
import { defaultConfig } from 'next/dist/server/config-shared'
import { combineReducers } from 'redux'
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'

const {createStore} = require("redux")

const initState = {
    counter: 77,
    inplay: 'false',
    parents: '',
    parent1: '',
    parent2: '',
    winstreak: 0,
    wrongguess: 0,  
    magnifyhover: false  
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
        if (action.payload.game === 'play') {
            console.log("play in the action dispatch")
            state.inplay = 'true'
            return state
        }
    }
    if (action.type === "NOT_PLAYING_GAME") {
        state.inplay = 'true'
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
    if (action.type === "SET_PARENTS_1") {                        
        state.parent1 = action.payload.parent1        
        return state         
    }
    if (action.type === "SET_PARENTS_2") {                
        state.parent2 = action.payload.parent2
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
    if (action.type === 'MAGNIFY_ON') {
        state.magnifyhover = true
        return state
    }
    if (action.type === 'MAGNIFY_OFF') {
        state.magnifyhover = false
        return state
    }
    else return state
}

const rootReducer = combineReducers({
    gameReducer,
})

const store = createStore(rootReducer)
// const store = configureStore({
//     reducer: rootReducer
// })

export default store
