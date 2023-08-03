import { combineReducers } from '@reduxjs/toolkit';
import mainReducer, { MainState } from 'redux/main/mainSlice';
// import logInOutGoogleReducer, { logInOutGoogleState } from 'redux/logInOutGoogle/logInOutGoogleSlice';
// import iconsReducer, { iconState } from 'redux/icons/iconsSlice';
// import dashboardReducer, { dashboardState } from 'redux/dashboard/dashboardSlice';

const rootReducer = combineReducers({
  main: mainReducer,
//   logInOutGoogle: logInOutGoogleReducer,
//   icons: iconsReducer,
//   dashboard: dashboardReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
