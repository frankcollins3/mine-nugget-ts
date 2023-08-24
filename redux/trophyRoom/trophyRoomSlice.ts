import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrophyRoomSliceState {
  // VIEW_SELECTED_STRAIN: Strain<any> ;      generic won't work because the clicked strain needs to have endpoints remove. cant do in effect because it redeclares object with all endpoints
  VIEW_SELECTED_STRAIN: any;   
  WALK_INTO_TROPHY_ROOM: boolean;
}

const initialState: TrophyRoomSliceState = {
  VIEW_SELECTED_STRAIN: {},
  WALK_INTO_TROPHY_ROOM: false,
};

                                        

const trophyRoomSlice = createSlice({
  name: 'trophyRoom',
  initialState,
  reducers: {
    SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    TOGGLE_WALK_INTO_TROPHY_ROOM: (state) => { state.WALK_INTO_TROPHY_ROOM = !state.WALK_INTO_TROPHY_ROOM },

    
  },
});

export const 
{ 
  SET_VIEW_SELECTED_STRAIN, TOGGLE_WALK_INTO_TROPHY_ROOM
} = trophyRoomSlice.actions;

export default trophyRoomSlice.reducer;
export type trophyRoomState = TrophyRoomSliceState;
