import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strain,minersOnStrainsINTERFACE } from 'utility/InterfaceTypes';

interface findMineSliceState {
  // this state toggles from showing just the user associated strains that the logged in user: saved, comments, likes or the data that other users have.
    SHOW_FEED: boolean;


    CURRENT_USER_STRAINS: minersOnStrainsINTERFACE[];
    ALL_USER_STRAINS: minersOnStrainsINTERFACE[];
    NO_FEED_SELECTED_STRAIN: { id: number, strain: string};
    NO_FEED_SHOW_MINE: boolean;
    
}

const initialState: findMineSliceState = {
    SHOW_FEED: false,    
    CURRENT_USER_STRAINS: [],
    ALL_USER_STRAINS: [],
    NO_FEED_SELECTED_STRAIN: {id: 0, strain: ''},
    NO_FEED_SHOW_MINE: false,
  };

                                    
const findMineSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    TOGGLE_SHOW_FEED: (state) => { state.SHOW_FEED = !state.SHOW_FEED },
    SET_CURRENT_USER_STRAINS: (state, action) => { state.CURRENT_USER_STRAINS = action.payload },
    SET_ALL_USER_STRAINS: (state, action) => { state.ALL_USER_STRAINS = action.payload },
    SET_NO_FEED_SELECTED_STRAIN: (state, action) => { state.NO_FEED_SELECTED_STRAIN = action.payload },
    TOGGLE_NO_FEED_SHOW_MINE: (state) => { state.NO_FEED_SHOW_MINE = !state.NO_FEED_SHOW_MINE },    
  },
});

export const 
{ 
    TOGGLE_SHOW_FEED, SET_CURRENT_USER_STRAINS, SET_ALL_USER_STRAINS, SET_NO_FEED_SELECTED_STRAIN, TOGGLE_NO_FEED_SHOW_MINE
  
} = findMineSlice.actions;

export default findMineSlice.reducer;
export type findMineState = findMineSliceState;
