import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  // DB interfaces
  Strain, minersOnStrainsINTERFACE, digsINTERFACE, minesINTERFACE,
  // component & state interfaces 
   noFeedSelectedStrainINTERFACE, noFeedNoStrainMsgsINTERFACE, 
  } from 'utility/InterfaceTypes';

interface findMineSliceState {
  // this state toggles from showing just the user associated strains that the logged in user: saved, comments, likes or the data that other users have.
    SHOW_FEED: boolean;


    CURRENT_USER_STRAINS: minersOnStrainsINTERFACE[];
    CURRENT_USER_LIKES: digsINTERFACE[];
    USER_LIKES_SELECTED_STRAIN: boolean;
    TRIGGER_LIKE_EFFECT: boolean;
    ALL_USER_STRAINS: minersOnStrainsINTERFACE[];
    NO_FEED_SELECTED_STRAIN: noFeedSelectedStrainINTERFACE;
    NO_FEED_NO_STRAIN_MSGS: noFeedNoStrainMsgsINTERFACE;
    NO_FEED_USER_LIKES_SELECTED_STRAIN: boolean;
    // NO_FEED_SELECTED_STRAIN: { id: number, strain: string};
    NO_FEED_SHOW_MINE: boolean;
    MINE_TITLE_INPUT_VAL: string;
    MINE_REVIEW_INPUT_VAL: string;
    TRIGGER_MINE_EFFECT: boolean;
    CURRENT_USER_REVIEWS: minesINTERFACE[]
    
    READY_TO_EDIT: boolean;

}

const initialState: findMineSliceState = {
    SHOW_FEED: false,    
    CURRENT_USER_STRAINS: [],
    CURRENT_USER_LIKES: [],
    USER_LIKES_SELECTED_STRAIN: false,
    TRIGGER_LIKE_EFFECT: false,
    NO_FEED_USER_LIKES_SELECTED_STRAIN: false,
    NO_FEED_NO_STRAIN_MSGS: { err: false, msg: ''},
    ALL_USER_STRAINS: [],
    NO_FEED_SELECTED_STRAIN: {id: 0, strain: ''},

    NO_FEED_SHOW_MINE: false,
    MINE_TITLE_INPUT_VAL: '',
    MINE_REVIEW_INPUT_VAL: '',
    TRIGGER_MINE_EFFECT: false,
    CURRENT_USER_REVIEWS: [],

    READY_TO_EDIT: false,
  };

                                    
const findMineSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    TOGGLE_SHOW_FEED: (state) => { state.SHOW_FEED = !state.SHOW_FEED },
    SET_CURRENT_USER_STRAINS: (state, action) => { state.CURRENT_USER_STRAINS = action.payload },

    SET_CURRENT_USER_LIKES: (state, action) => { state.CURRENT_USER_LIKES = action.payload },
    TOGGLE_USER_LIKES_SELECTED_STRAIN: (state) => { state.USER_LIKES_SELECTED_STRAIN = !state.USER_LIKES_SELECTED_STRAIN },
    TOGGLE_TRIGGER_LIKE_EFFECT: (state) => { state.TRIGGER_LIKE_EFFECT = !state.TRIGGER_LIKE_EFFECT },
    TOGGLE_NO_FEED_USER_LIKES_SELECTED_STRAIN: (state) => { state.NO_FEED_USER_LIKES_SELECTED_STRAIN = !state.NO_FEED_USER_LIKES_SELECTED_STRAIN },
    
    
    SET_NO_FEED_NO_STRAIN_MSGS: (state, action) => { state.NO_FEED_NO_STRAIN_MSGS = action.payload },
    SET_ALL_USER_STRAINS: (state, action) => { state.ALL_USER_STRAINS = action.payload },
    SET_NO_FEED_SELECTED_STRAIN: (state, action) => { state.NO_FEED_SELECTED_STRAIN = action.payload },
    
    TOGGLE_NO_FEED_SHOW_MINE: (state) => { state.NO_FEED_SHOW_MINE = !state.NO_FEED_SHOW_MINE },    
    SET_MINE_TITLE_INPUT_VAL: (state, action) =>  {state.MINE_TITLE_INPUT_VAL = action.payload},
    SET_MINE_REVIEW_INPUT_VAL: (state, action) =>  {state.MINE_REVIEW_INPUT_VAL = action.payload},
    TOGGLE_TRIGGER_MINE_EFFECT: (state) => { state.TRIGGER_MINE_EFFECT = !state.TRIGGER_MINE_EFFECT },
    SET_CURRENT_USER_REVIEWS: (state, action) => { state.CURRENT_USER_REVIEWS = action.payload },
    

    TOGGLE_READY_TO_EDIT: (state) => { state.READY_TO_EDIT = !state.READY_TO_EDIT },    

  },
});

export const 
{ 
  TOGGLE_SHOW_FEED, SET_CURRENT_USER_STRAINS, SET_CURRENT_USER_LIKES, TOGGLE_USER_LIKES_SELECTED_STRAIN,
  TOGGLE_TRIGGER_LIKE_EFFECT, SET_ALL_USER_STRAINS, SET_NO_FEED_SELECTED_STRAIN, TOGGLE_NO_FEED_USER_LIKES_SELECTED_STRAIN, 
  SET_NO_FEED_NO_STRAIN_MSGS, 
  TOGGLE_NO_FEED_SHOW_MINE, SET_MINE_TITLE_INPUT_VAL, SET_MINE_REVIEW_INPUT_VAL, TOGGLE_TRIGGER_MINE_EFFECT, SET_CURRENT_USER_REVIEWS,
  TOGGLE_READY_TO_EDIT, 

} = findMineSlice.actions;

export default findMineSlice.reducer;
export type findMineState = findMineSliceState;
