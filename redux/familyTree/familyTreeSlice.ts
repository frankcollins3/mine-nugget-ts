import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strain } from 'utility/InterfaceTypes';

interface familyTreeSliceState {
    PLAYING: boolean
    // the picked strain object data
    PLAYING_STRAIN: any
    // strain.parents split. 1 parent shown
    PLAYING_PARENT_KING: string;
    // strain.parents split. 2nd parent shown
    PLAYING_PARENT_QUEEN: string;

// The "Child" of the KING & QUEEN. child strain can be seen on page 1 but parents can't. Guessing game based on providing parents. guessing child.
    PLAYING_GUESS_RIGHT: string;

    // these 3 wrong options and the above PLAYING_GUESS_RIGHT correct option create the game.
    PLAYING_GUESS_WRONG_1: string;
    PLAYING_GUESS_WRONG_2: string;
    PLAYING_GUESS_WRONG_3: string;
}

const initialState: familyTreeSliceState = {
    PLAYING: false,
    PLAYING_STRAIN: { strainid: 0, strain: '', dominant: '', funfact: '', gold: '', nugget: '', parents: '', smell: '', taste: '', thc: '', cbd: '' },
    PLAYING_PARENT_KING: '',
    PLAYING_PARENT_QUEEN: '',

    PLAYING_GUESS_RIGHT: '',
    PLAYING_GUESS_WRONG_1: '',
    PLAYING_GUESS_WRONG_2: '',
    PLAYING_GUESS_WRONG_3: '',
};

                                    
const familyTreeSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // SET_SEE_LOGIN_OR_SIGNUP: (state, action) => { state.SEE_LOGIN_OR_SIGNUP = action.payload },
    TOGGLE_PLAYING: (state) => { state.PLAYING = !state.PLAYING },
    SET_PLAYING_STRAIN: (state, action) => { state.PLAYING_STRAIN = action.payload },

    SET_PLAYING_PARENT_KING: (state, action) => { state.PLAYING_PARENT_KING = action.payload },
    SET_PLAYING_PARENT_QUEEN: (state, action) => { state.PLAYING_PARENT_QUEEN = action.payload },

    SET_PLAYING_GUESS_RIGHT: (state, action) => { state.PLAYING_GUESS_RIGHT = action.payload },
    SET_PLAYING_GUESS_WRONG_1: (state, action) => { state.PLAYING_GUESS_WRONG_1 = action.payload },
    SET_PLAYING_GUESS_WRONG_2: (state, action) => { state.PLAYING_GUESS_WRONG_2 = action.payload },
    SET_PLAYING_GUESS_WRONG_3: (state, action) => { state.PLAYING_GUESS_WRONG_3 = action.payload },
        
  },
});

export const 
{ 
 TOGGLE_PLAYING, SET_PLAYING_STRAIN, SET_PLAYING_PARENT_KING, SET_PLAYING_PARENT_QUEEN, 
 SET_PLAYING_GUESS_RIGHT, SET_PLAYING_GUESS_WRONG_1, SET_PLAYING_GUESS_WRONG_2, SET_PLAYING_GUESS_WRONG_3
  
} = familyTreeSlice.actions;

export default familyTreeSlice.reducer;
export type familyTreeState = familyTreeSliceState;
