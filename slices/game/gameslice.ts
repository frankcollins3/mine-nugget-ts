import { createSlice } from '@reduxjs/toolkit'

const game = createSlice({
    name: "playing",
    initialState: {                         // { actions } = game
        inplay: false
        // inplay: false
    },
    reducers: {                 // { reducer } = game
        play: (state = game.initialState, action) => {
            if (action.type === 'playing') {
                return {
                    ...state, 
                    // inplay: state.inplay = true
                    inplay: true
                }
            } else if (action.type === 'notplaying') {
                return {
                    ...state,
                    inplay: false
                }
            }
            return state
        },
    }
});

// destructuring
const { actions, reducer } = game   
export const { play } = actions
export default reducer
