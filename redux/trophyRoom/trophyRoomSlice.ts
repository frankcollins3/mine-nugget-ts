import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {useImage} from "Contexts/Img"    // have to hard code the string values 


interface TrophyRoomSliceState {
  // VIEW_SELECTED_STRAIN: Strain<any> ;      generic won't work because the clicked strain needs to have endpoints remove. cant do in effect because it redeclares object with all endpoints
  VIEW_SELECTED_STRAIN: any;   
  WALK_INTO_TROPHY_ROOM: boolean;
  WHICH_IMAGE_ARRAY: string[]
  WHICH_IMAGE_INDEX: number;
  CURTAIN_IMAGE_CLICK: string,

  PHOTOS_ARRAY: any[]
  WHICH_PHOTO_INDEX: number;
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
      '/img/trophyroom6333.png', '/img/barrel.png', '/img/barrels.png', '/img/barrier.png', '/img/cart.png', '/img/minecart.png', '/img/caution.png', 
      '/img/cone_hat.png', '/img/pick.png',
    ],
    // strains

    // findmine
    [
      '/img/dynamite.png', '/img/firetag.png', '/img/edit.png', '/img/eraser.png', '/img/glasses.png', '/img/gold.png', '/img/gold-bars.png', 
      '/img/magnify.png', '/img/magnify2.png', '/img/search.png', '/img/mine.png', '/img/pickaxe.png', '/img/shovel.png',
      '/img/vest.png', '/img/signupsigns.png', '/img/helmet.png', '/img/coin.png', '/img/ilink.png', '/img/welink.png', '/img/navbardice.png', 
    ],
    // findmine

    // familytree    
    [
      '/img/ring.png', '/img/watch.png',
      '/img/cactus.png', '/img/kiss.png', '/img/luckypull.png',
      '/img/king.png', '/img/queen.png', '/img/joker.png', '/img/kingspades.png', '/img/queenspades.png', '/img/cards.png', '/img/blackjack.png',
    '/img/wincards.png', '/img/upsidedowncard.png', '/img/deckcards.png', '/img/goldenticket.png', '/img/winoneheart.png', '/img/winthreehearts.png',
    '/img/kingqueensplit.png', 
    ],
    // familytree
    
    // trophyroom
    [
      '/img/moviesPopcorn.png', '/img/red-carpet.png', '/img/cinemaRopes.png', '/img/photos.png', '/img/film.png', '/img/curtain.png', '/img/redCarpetHome.png',
      '/img/winsCeremony.png', '/img/moviereel.png', '/img/frame.png',
    ]
    // trophyroom
  ],
  WHICH_PHOTO_INDEX: 0,
    

  /* 
barrel,  barrels, barrier, cactus, cart, coin, caution, coneHat, vest, desert, dynamite, edit, eraser, firetag, glasses,
goldBars,gold, goldenTriangle, helmet, litPaper, magnify, magnify2, magnify3, mine, mineCart, mirror, pick, pickaxe, ring, shovel, signUpSigns, trophy, unLitPaper, 
watch, goldcursor1, goldcursor2, kiss, luckypull,

king, queen, joker, kingspades, queenspades, cards, blackjack, navbardice, wincards, upsidedowncard, deckcards, goldenticket, winoneheart, winthreecards, howmanywinsprofile, kingqueensplit, ilink, welink,
trophyroom6333icons, moviesPopcorn, redCarpet, cinemaRopes, photos, film, curtain, redCarpetHome, winsCeremony, movieReel, frame
*/

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
    WHICH_PHOTO_INCREMENT: (state) => { state.WHICH_PHOTO_INDEX = state.WHICH_PHOTO_INDEX + 1 },
    WHICH_PHOTO_DECREMENT: (state) => { state.WHICH_PHOTO_INDEX = state.WHICH_PHOTO_INDEX - 1 },    
  
  },
});

export const 
{ 
  SET_VIEW_SELECTED_STRAIN, TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_INCREMENT, WHICH_IMAGE_DECREMENT, SET_CURTAIN_IMAGE_CLICK, WHICH_PHOTO_INCREMENT, WHICH_PHOTO_DECREMENT
} = trophyRoomSlice.actions;

export default trophyRoomSlice.reducer;
export type trophyRoomState = TrophyRoomSliceState;
