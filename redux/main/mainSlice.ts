import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strain } from 'utility/InterfaceTypes';

interface MainSliceState {
  // main
  VIEW_SELECTED_STRAIN: Strain<any> ;  
  VIEW_SELECTED_STRAIN_INDEX: number;
  VIEW_SELECTED_STRAIN_KEY: string,
  VIEW_SELECTED_STRAIN_VALUE: string | number,
  ALL_STRAINS: any[];
}

const initialState: MainSliceState = {
  // main
  VIEW_SELECTED_STRAIN: { strain: '', strainid: 0, dominant: '', funfact: '', parents: '', taste: '', smell: '', gold: '', nugget: '', thc: '', cbd: '', mines: [], digs: [], miners: [] },
  VIEW_SELECTED_STRAIN_INDEX: 0,
  VIEW_SELECTED_STRAIN_KEY: '',
  VIEW_SELECTED_STRAIN_VALUE: '',
  ALL_STRAINS: [],
};

// strain: string,
// strainid: number,
// dominant: string,
// funfact: string,
// parents: string,
// taste: string,
// smell: string,
// gold: string,
// nugget: string,
// thc: string,
// cbd: string,
// mines: any[] | null | undefined, // mines: minesINTERFACE[] | null | undefined,
// digs: any[] | null | undefined, // digs: digsINTERFACE[] | null | undefined,
// miners: any[] | null | undefined // miners: any[] | null | undefined       


const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    SET_VIEW_SELECTED_STRAIN_INDEX: (state, action) => { state.VIEW_SELECTED_STRAIN_INDEX = action.payload; },
    SET_VIEW_SELECTED_STRAIN_KEY: (state, action) => { state.VIEW_SELECTED_STRAIN_KEY = action.payload; },
    SET_VIEW_SELECTED_STRAIN_VALUE: (state, action) => { state.VIEW_SELECTED_STRAIN_VALUE = action.payload; },
    VIEW_SELECTED_STRAIN_KEY: (state, action) => { state.VIEW_SELECTED_STRAIN_KEY = action.payload; },
    SET_ALL_STRAINS: (state, action) => { state.ALL_STRAINS = action.payload; },
    // SET_CURRENT_PAGE: (state, action) => { state.CURRENT_PAGE = action.payload; },    

  },
});

export const 
{ 
    SET_VIEW_SELECTED_STRAIN, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_ALL_STRAINS
} = mainSlice.actions;

export default mainSlice.reducer;
export type MainState = MainSliceState;
