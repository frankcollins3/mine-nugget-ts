import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strain } from 'utility/InterfaceTypes';

interface findMineSliceState {
  // this state toggles from showing just the user associated strains that the logged in user: saved, comments, likes or the data that other users have.
    SHOW_FEED: boolean;
    
}

const initialState: findMineSliceState = {
    SHOW_FEED: false,    
  };

                                    
const findMineSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    TOGGLE_SHOW_FEED: (state) => { state.SHOW_FEED = !state.SHOW_FEED }
  },
});

export const 
{ 
    TOGGLE_SHOW_FEED
  
} = findMineSlice.actions;

export default findMineSlice.reducer;
export type findMineState = findMineSliceState;
