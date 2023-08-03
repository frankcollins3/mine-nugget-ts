import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainSliceState {
  // main
  VIEW_SELECTED_STRAIN: string;  
  VIEW_SELECTED_STRAIN_INDEX: number;
}

const initialState: MainSliceState = {
  // main
  VIEW_SELECTED_STRAIN: 'testStrain',
  VIEW_SELECTED_STRAIN_INDEX: 0,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    SET_VIEW_SELECTED_STRAIN_INDEX: (state, action) => { state.VIEW_SELECTED_STRAIN_INDEX = action.payload; },
    // SET_CURRENT_PAGE: (state, action) => { state.CURRENT_PAGE = action.payload; },    
  },
});

export const 
{ 
    SET_VIEW_SELECTED_STRAIN, SET_VIEW_SELECTED_STRAIN_INDEX
} = mainSlice.actions;

export default mainSlice.reducer;
export type MainState = MainSliceState;
