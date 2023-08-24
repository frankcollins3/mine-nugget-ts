import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {useImage} from "Contexts/Img"    // have to hard code the string values 


interface TrophyRoomSliceState {
  // VIEW_SELECTED_STRAIN: Strain<any> ;      generic won't work because the clicked strain needs to have endpoints remove. cant do in effect because it redeclares object with all endpoints
  VIEW_SELECTED_STRAIN: any;   
  WALK_INTO_TROPHY_ROOM: boolean;
  WHICH_IMAGE_ARRAY: string[]
  WHICH_IMAGE_INDEX: number;
}

const initialState: TrophyRoomSliceState = {
  VIEW_SELECTED_STRAIN: {},
  WALK_INTO_TROPHY_ROOM: false,
  WHICH_IMAGE_ARRAY: ['/img/moviesPopcorn.png', '/img/film.png', '/img/photos.png'],
  WHICH_IMAGE_INDEX: 0,

};
                                      
const trophyRoomSlice = createSlice({
  name: 'trophyRoom',
  initialState,
  reducers: {
    SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    TOGGLE_WALK_INTO_TROPHY_ROOM: (state) => { state.WALK_INTO_TROPHY_ROOM = !state.WALK_INTO_TROPHY_ROOM },
    WHICH_IMAGE_INCREMENT: (state) => { state.WHICH_IMAGE_INDEX = state.WHICH_IMAGE_INDEX + 1 },
    WHICH_IMAGE_DECREMENT: (state) => { state.WHICH_IMAGE_INDEX = state.WHICH_IMAGE_INDEX - 1 }    
  },
});

export const 
{ 
  SET_VIEW_SELECTED_STRAIN, TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_INCREMENT, WHICH_IMAGE_DECREMENT
} = trophyRoomSlice.actions;

export default trophyRoomSlice.reducer;
export type trophyRoomState = TrophyRoomSliceState;
