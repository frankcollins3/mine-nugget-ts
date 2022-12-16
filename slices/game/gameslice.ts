import { createSlice } from '@reduxjs/toolkit'

const game = createSlice({
    name: "playing",
    initialState: {
        inplay: false
        // inplay: false
    },
    reducers: {
        save: (state = game.initialState, action) => {
            if (action.type === 'playing') {
                return {
                    ...state, 
                    state: true
                }
            } else if (action.type === 'notplaying') {
                return {
                    ...state,
                    state: false
                }
            }
            // state.location = [...state.location, payload];
        },
    }
});