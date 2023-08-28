import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { minersINTERFACE } from 'utility/InterfaceTypes';
// import {useImage} from "Contexts/Img"    // have to hard code the string values 


interface TrophyRoomSliceState {
  // VIEW_SELECTED_STRAIN: Strain<any> ;      generic won't work because the clicked strain needs to have endpoints remove. cant do in effect because it redeclares object with all endpoints
  VIEW_SELECTED_STRAIN: any;   
  WALK_INTO_TROPHY_ROOM: boolean;
  WHICH_IMAGE_ARRAY: string[]
  WHICH_IMAGE_INDEX: number;
  CURTAIN_IMAGE_CLICK: string;

  PHOTOS_ARRAY: any[];
  OUTER_PHOTO_INDEX: number;
  NESTED_PHOTO_INDEX: number;
  PHOTO_ARRAY_INDEX_VISITED: any[];
  STARS_RANDOM_USER: any;
  // STARS_RANDOM_USER: minersINTERFACE;
  STARS_ARRAY: [];
  VIDEO_SRC_ARRAY_INDEX: number;
}

const initialState: TrophyRoomSliceState = {
  VIEW_SELECTED_STRAIN: {},
  WALK_INTO_TROPHY_ROOM: false,
  WHICH_IMAGE_ARRAY: ['/img/moviesPopcorn.png', '/img/winsCeremony.png', '/img/photos.png'],
  // WHICH_IMAGE_ARRAY: ['/img/moviesPopcorn.png', '/img/film.png', '/img/photos.png', '/img/winsCeremony.png'],
  WHICH_IMAGE_INDEX: 0,
  CURTAIN_IMAGE_CLICK: '',

  PHOTOS_ARRAY: [
    // strains
    [
      '/img/pick.png', '/img/barrel.png', '/img/barrels.png', '/img/barrier.png', '/img/cart.png', '/img/minecart.png', '/img/caution.png', 
      '/img/cone_hat.png',  '/img/kiss.png', '/img/gold.png',
    ],
    // strains
    
    // familytree    
    [
      '/img/ring.png', '/img/watch.png',
      '/img/cactus.png', '/img/luckypull.png',
      '/img/king.png', '/img/queen.png', '/img/joker.png', '/img/kingspades.png', '/img/queenspades.png', '/img/cards.png', '/img/blackjack.png',
      '/img/wincards.png', '/img/upsidedowncard.png', '/img/deckcards.png', '/img/goldenticket.png', '/img/winthreehearts.png',
      '/img/kingqueensplit.png', '/img/winoneheart.png',
    ],

    // findmine
    [
      '/img/gold-bars.png', '/img/dynamite.png', '/img/firetag.png', '/img/edit.png', '/img/eraser.png', '/img/glasses.png', '/img/gold.png', 
      '/img/magnify.png', '/img/magnify2.png', '/img/search.png', '/img/mine.png', '/img/pickaxe.png', '/img/shovel.png',
      '/img/vest.png', '/img/signupsigns.png', '/img/helmet.png', '/img/ilink.png', '/img/welink.png', '/img/navbardice.png', '/img/coin.png',
    ],
    // familytree

    // trophyroom
    [
     '/img/star.png', '/img/royalflush6333.png', '/img/moviesPopcorn.png', '/img/red-carpet.png', '/img/cinemaRopes.png', '/img/photos.png', '/img/film.png', '/img/curtain.png', '/img/redCarpetHome.png',
      '/img/winsCeremony.png', '/img/moviereel.png', '/img/frame.png',
    ]
    // trophyroom
  ],
  OUTER_PHOTO_INDEX: 0,
  NESTED_PHOTO_INDEX: 0,
  PHOTO_ARRAY_INDEX_VISITED: [ [0], [0], [0], [] ],
  STARS_RANDOM_USER: { username: '', password: '', email: '', age: 0, wins: 0, icon: '', strains: [] },
  // STARS_RANDOM_USER: { username: '', password: '', email: '', age: 0, password: '', wins: 0, icon: '', strains: [] },

  STARS_ARRAY: [],
  VIDEO_SRC_ARRAY_INDEX: 0,

};
                                      
const trophyRoomSlice = createSlice({
  name: 'trophyRoom',
  initialState,
  reducers: {
    SET_VIEW_SELECTED_STRAIN: (state, action) => { state.VIEW_SELECTED_STRAIN = action.payload; },
    TOGGLE_WALK_INTO_TROPHY_ROOM: (state) => { state.WALK_INTO_TROPHY_ROOM = !state.WALK_INTO_TROPHY_ROOM },
    WHICH_IMAGE_INCREMENT: (state) => { state.WHICH_IMAGE_INDEX = state.WHICH_IMAGE_INDEX + 1 },
    WHICH_IMAGE_DECREMENT: (state) => { state.WHICH_IMAGE_INDEX = state.WHICH_IMAGE_INDEX - 1 },    
    SET_CURTAIN_IMAGE_CLICK: (state, action) => { state.CURTAIN_IMAGE_CLICK = action.payload; },
    
    // photo footer
    SET_OUTER_PHOTO_INDEX: (state, action) => { state.OUTER_PHOTO_INDEX = action.payload },
    NESTED_PHOTO_INCREMENT: (state) => { state.NESTED_PHOTO_INDEX = state.NESTED_PHOTO_INDEX + 1 },
    NESTED_PHOTO_DECREMENT: (state) => { state.NESTED_PHOTO_INDEX = state.NESTED_PHOTO_INDEX - 1 },    
    NESTED_PHOTO_RESET: (state) => { state.NESTED_PHOTO_INDEX = 0 },    
    NESTED_PHOTO_LENGTH_END: (state, action) => { state.NESTED_PHOTO_INDEX = action.payload },
    
    PHOTO_ARRAY_INDEX_PUSH: (state, action) => { state.PHOTO_ARRAY_INDEX_VISITED[action.payload.outerindex].push(action.payload.innerindex)},
    PHOTO_ARRAY_INDEX_VISITED_RESET: (state) => { state.PHOTO_ARRAY_INDEX_VISITED = [ [0], [0], [0], [] ] }, 
    SET_STARS_RANDOM_USER: (state, action) => { state.STARS_RANDOM_USER = action.payload },
    SET_STARS_ARRAY: (state, action) => { state.STARS_ARRAY = action.payload },
    RESET_STARS_ARRAY: (state) => { state.STARS_ARRAY = [] },

    INCREMENT_VIDEO_SRC_ARRAY: (state) => { state.VIDEO_SRC_ARRAY_INDEX = state.VIDEO_SRC_ARRAY_INDEX + 1 },
    // INCREMENT_VIDEO_SRC_ARRAY: (state) => { state.VIDEO_SRC_ARRAY_INDEX = state.VIDEO_SRC_ARRAY_INDEX + 1 },
    RESET_VIDEO_SRC_ARRAY: (state) => { state.VIDEO_SRC_ARRAY_INDEX = 0 },

  },
});

export const 
{ 
  SET_VIEW_SELECTED_STRAIN, TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_INCREMENT, WHICH_IMAGE_DECREMENT, SET_CURTAIN_IMAGE_CLICK,
  SET_OUTER_PHOTO_INDEX, NESTED_PHOTO_INCREMENT, NESTED_PHOTO_DECREMENT, NESTED_PHOTO_RESET, NESTED_PHOTO_LENGTH_END, PHOTO_ARRAY_INDEX_PUSH, PHOTO_ARRAY_INDEX_VISITED_RESET,

  SET_STARS_RANDOM_USER, SET_STARS_ARRAY, RESET_STARS_ARRAY,
  INCREMENT_VIDEO_SRC_ARRAY, RESET_VIDEO_SRC_ARRAY
} = trophyRoomSlice.actions;

export default trophyRoomSlice.reducer;
export type trophyRoomState = TrophyRoomSliceState;
