import { combineReducers } from '@reduxjs/toolkit';
import mainReducer, { MainState } from 'redux/main/mainSlice';
import loginSignupReducer, { LoginSignupState } from 'redux/loginSignup/loginSignupSlice';
import familyTreeReducer, { familyTreeState } from 'redux/familyTree/familyTreeSlice';
import findMineReducer, { findMineState } from 'redux/findMine/findMineSlice';
import trophyRoomReducer, { trophyRoomState } from 'redux/trophyRoom/trophyRoomSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  loginSignup: loginSignupReducer,
  familyTree: familyTreeReducer,
  findMine: findMineReducer,
  trophyRoom: trophyRoomReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
