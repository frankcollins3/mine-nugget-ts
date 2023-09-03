import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  // DB interfaces
  Strain, minersOnStrainsINTERFACE, digsINTERFACE, minesINTERFACE,
  // component & state interfaces 
   noFeedSelectedStrainINTERFACE, feedSelectedStrainINTERFACE, noFeedNoStrainMsgsINTERFACE, 
  } from 'utility/InterfaceTypes';

interface findMineSliceState {
  // this state toggles from showing just the user associated strains that the logged in user: saved, comments, likes or the data that other users have.
    SHOW_FEED: boolean;


    CURRENT_USER_STRAINS: minersOnStrainsINTERFACE[];
    CURRENT_USER_LIKES: digsINTERFACE[];
    TRIGGER_USER_STRAINS_EFFECT: boolean;
    DONT_RUN_USER_STRAINS_EFFECT_PROMISE: boolean;

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
    SHOW_ICONS: boolean;    
    READY_TO_EDIT: boolean;
    
    // SHOW_FEED
    FEED_SELECTED_USER: any;
    FEED_SELECTED_USER_STRAINS: any[];
    FEED_SELECTED_USER_REVIEWS: minesINTERFACE;
    COIN_HOVER_STRAIN: feedSelectedStrainINTERFACE;
    SHOW_INPUT: boolean;
    CURRENT_USER_REVIEWS: minesINTERFACE[];
    FEED_SEARCH_TERM: string;

    USER_ICON_SAVE_ERROR: boolean;
}

const initialState: findMineSliceState = {
    SHOW_FEED: false,    
    CURRENT_USER_STRAINS: [],
    CURRENT_USER_LIKES: [],
    TRIGGER_USER_STRAINS_EFFECT: false,
    DONT_RUN_USER_STRAINS_EFFECT_PROMISE: true,

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
    SHOW_ICONS: false,
    
    
    // SHOW_FEED
    // id |  username  | password | age | email | wins | icon 
    FEED_SELECTED_USER: {username: '', password: '', email: '', age: 0, wins: 0, icon: '' },
    FEED_SELECTED_USER_STRAINS: [],
    FEED_SELECTED_USER_REVIEWS: { title: '', userId: 0, review: '', strainid: 0 },
    FEED_SEARCH_TERM: '',
    CURRENT_USER_REVIEWS: [],
    READY_TO_EDIT: false,

    COIN_HOVER_STRAIN: {id: 0, strain: '', like: false },
    SHOW_INPUT: false,

    USER_ICON_SAVE_ERROR: false,
  };

                                    
const findMineSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // NO_FEED_CONTAINER (userProfile that can't see other user data)
    TOGGLE_SHOW_FEED: (state) => { state.SHOW_FEED = !state.SHOW_FEED },
    SET_CURRENT_USER_STRAINS: (state, action) => { state.CURRENT_USER_STRAINS = action.payload },
    TOGGLE_TRIGGER_USER_STRAINS_EFFECT: (state) => { state.TRIGGER_USER_STRAINS_EFFECT = !state.TRIGGER_USER_STRAINS_EFFECT },
    TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE: (state) => { state.DONT_RUN_USER_STRAINS_EFFECT_PROMISE = !state.DONT_RUN_USER_STRAINS_EFFECT_PROMISE },

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
    TOGGLE_SHOW_ICONS: (state) => { state.SHOW_ICONS = !state.SHOW_ICONS },
    SET_CURRENT_USER_REVIEWS: (state, action) => { state.CURRENT_USER_REVIEWS = action.payload },

    TOGGLE_READY_TO_EDIT: (state) => { state.READY_TO_EDIT = !state.READY_TO_EDIT },    
    
    // FEED_CONTAINER (user can see other user data like usernames, and other users' associative strain data from psql)
    SET_FEED_SELECTED_USER: (state, action) => { state.FEED_SELECTED_USER = action.payload },
    SET_FEED_SELECTED_USER_STRAINS: (state, action) => { state.FEED_SELECTED_USER = action.payload },
    SET_FEED_SELECTED_USER_REVIEWS: (state, action) => { state.FEED_SELECTED_USER_REVIEWS = action.payload },
    SET_FEED_SEARCH_TERM: (state, action) => { state.FEED_SEARCH_TERM = action.payload },
    SET_COIN_HOVER_STRAIN: (state, action) => { state.COIN_HOVER_STRAIN = action.payload },
    
    TOGGLE_SHOW_INPUT: (state) => { state.SHOW_INPUT = !state.SHOW_INPUT },    
    TOGGLE_USER_ICON_SAVE_ERROR: (state) => { state.USER_ICON_SAVE_ERROR = !state.USER_ICON_SAVE_ERROR },    
  },
});

export const 
{ 
  // NO_FEED_CONTAINER
  TOGGLE_SHOW_FEED, SET_CURRENT_USER_STRAINS, TOGGLE_TRIGGER_USER_STRAINS_EFFECT, SET_CURRENT_USER_LIKES, TOGGLE_USER_LIKES_SELECTED_STRAIN, TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE,
  TOGGLE_TRIGGER_LIKE_EFFECT, SET_ALL_USER_STRAINS, SET_NO_FEED_SELECTED_STRAIN, TOGGLE_NO_FEED_USER_LIKES_SELECTED_STRAIN, 
  SET_NO_FEED_NO_STRAIN_MSGS, SET_COIN_HOVER_STRAIN, SET_FEED_SELECTED_USER, SET_FEED_SELECTED_USER_REVIEWS,
  TOGGLE_NO_FEED_SHOW_MINE, SET_MINE_TITLE_INPUT_VAL, SET_MINE_REVIEW_INPUT_VAL, TOGGLE_TRIGGER_MINE_EFFECT, TOGGLE_SHOW_ICONS, SET_CURRENT_USER_REVIEWS, SET_FEED_SEARCH_TERM,

  TOGGLE_READY_TO_EDIT,   
  // FEED_CONTAINER
  TOGGLE_SHOW_INPUT,

  TOGGLE_USER_ICON_SAVE_ERROR

} = findMineSlice.actions;

export default findMineSlice.reducer;
export type findMineState = findMineSliceState;
