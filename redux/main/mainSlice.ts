import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strain, minersINTERFACE } from 'utility/InterfaceTypes';

interface MainSliceState {
  // VIEW_SELECTED_STRAIN: Strain<any> ;      generic won't work because the clicked strain needs to have endpoints remove. cant do in effect because it redeclares object with all endpoints
  VIEW_SELECTED_STRAIN: any ;   
  VIEW_SELECTED_STRAIN_INDEX: number;
  VIEW_SELECTED_STRAIN_KEY: string,
  VIEW_SELECTED_STRAIN_VALUE: string | number,
  SELECTED_STRAIN_SAVE_OR_NOT: boolean;
  SELECTED_STRAIN_SAVE_ERROR: boolean;
  ALL_STRAINS: any[];
  CURRENT_PAGE: string,
  MINE_CANVAS_TOUCH: boolean,

  ALL_USERS: any[];
  ALL_USERNAMES: any[];
  ALL_EMAILS: any[];
  CURRENT_USER: {id: number, username: string, email: string, password: string, age: number, icon: string|undefined, wins: number|undefined};

  HOVER_EVEN_ODD: boolean;
  // CURRENT_USER: minersINTERFACE  no ID moving on since I already used {Strain} with generics and Typescript OMIT
}

const initialState: MainSliceState = {
  VIEW_SELECTED_STRAIN: {},
  VIEW_SELECTED_STRAIN_INDEX: 0,
  VIEW_SELECTED_STRAIN_KEY: '',
  VIEW_SELECTED_STRAIN_VALUE: '',
  SELECTED_STRAIN_SAVE_OR_NOT: false,
  SELECTED_STRAIN_SAVE_ERROR: false,
  ALL_STRAINS: [],
  CURRENT_PAGE: '',
  MINE_CANVAS_TOUCH: false,

  ALL_USERS: [],
  ALL_USERNAMES: [],
  ALL_EMAILS: [],
  CURRENT_USER: {id: 0, username: '', email: '', password: '', age: 0, icon: '', wins: 0},
  HOVER_EVEN_ODD: false
};

                                        

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    SET_VIEW_SELECTED_STRAIN_INDEX: (state, action) => { state.VIEW_SELECTED_STRAIN_INDEX = action.payload; },
    SET_VIEW_SELECTED_STRAIN_KEY: (state, action) => { state.VIEW_SELECTED_STRAIN_KEY = action.payload; },
    SET_VIEW_SELECTED_STRAIN_VALUE: (state, action) => { state.VIEW_SELECTED_STRAIN_VALUE = action.payload; },
    VIEW_SELECTED_STRAIN_KEY: (state, action) => { state.VIEW_SELECTED_STRAIN_KEY = action.payload; },
    TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT: (state) => { state.SELECTED_STRAIN_SAVE_OR_NOT = !state.SELECTED_STRAIN_SAVE_OR_NOT },
    TOGGLE_SELECTED_STRAIN_SAVE_ERROR: (state) => { state.SELECTED_STRAIN_SAVE_ERROR = !state.SELECTED_STRAIN_SAVE_ERROR },
    SET_ALL_STRAINS: (state, action) => { state.ALL_STRAINS = action.payload; },
    SET_CURRENT_PAGE: (state, action) => { state.CURRENT_PAGE = action.payload },
    TOGGLE_MINE_CANVAS_TOUCH: (state) => { state.MINE_CANVAS_TOUCH = !state.MINE_CANVAS_TOUCH },
    
    SET_ALL_USERS: (state, action) => { state.ALL_USERS = action.payload; },
    SET_ALL_USERNAMES: (state, action) => { state.ALL_USERNAMES = action.payload; },
    SET_ALL_EMAILS: (state, action) => { state.ALL_EMAILS = action.payload; },
    SET_CURRENT_USER: (state, action) => { state.CURRENT_USER = action.payload },
    TOGGLE_HOVER_EVEN_ODD: (state) => { state.HOVER_EVEN_ODD = !state.HOVER_EVEN_ODD }
    
  },
});

export const 
{ 
  SET_VIEW_SELECTED_STRAIN, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_ALL_STRAINS, 
  TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT, TOGGLE_SELECTED_STRAIN_SAVE_ERROR,
  SET_CURRENT_PAGE, TOGGLE_MINE_CANVAS_TOUCH, 

  SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS, SET_CURRENT_USER, TOGGLE_HOVER_EVEN_ODD
} = mainSlice.actions;

export default mainSlice.reducer;
export type MainState = MainSliceState;
