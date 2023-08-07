import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Strain } from 'utility/InterfaceTypes';

interface LoginSignupSliceState {
  // VIEW_SELECTED_STRAIN: Strain<any> ;      generic won't work because the clicked strain needs to have endpoints remove. cant do in effect because it redeclares object with all endpoints

  SEE_LOGIN_OR_SIGNUP: string;

  LOGIN_EMAIL_INPUT: string;
  LOGIN_PASSWORD_INPUT: string;

  SIGNUP_USERNAME_INPUT: string;
  SIGNUP_EMAIL_INPUT: string;
  SIGNUP_AGE_INPUT: string;
  SIGNUP_PASSWORD_INPUT: string;
  CHECKED: string;

  PASSWORD_UPPERCASE: boolean;
  PASSWORD_SPECIAL_CHAR: boolean;
  PASSWORD_NUMBER_CHAR: boolean;
  PASSWORD_LENGTH_PASS: boolean;
  PASSWORD_TOO_EZ: boolean;
  PASSWORD_TOO_EZ_BANK: any[];
  SIGNUP_PASSWORD_SEE: boolean;

  EMAIL_UNIQUE: boolean;
  EMAIL_EXTENSION: boolean;
  EMAIL_EXTENSION_UI: string,

  USERNAME_UNIQUE: boolean;
  USERNAME_LENGTH: boolean;


  //  const passworduppercase = false; const specialchar = false; const numberchar = false;

}

const initialState: LoginSignupSliceState = {
  SEE_LOGIN_OR_SIGNUP: '',

  LOGIN_EMAIL_INPUT: '@',
  LOGIN_PASSWORD_INPUT: '* * * * *',

  SIGNUP_USERNAME_INPUT: 'username',
  SIGNUP_EMAIL_INPUT: '@',
  SIGNUP_AGE_INPUT: 'age',
  SIGNUP_PASSWORD_INPUT: '* * *',
  CHECKED: '',
  PASSWORD_UPPERCASE: false,
  PASSWORD_SPECIAL_CHAR: false,
  PASSWORD_NUMBER_CHAR: false,
  PASSWORD_LENGTH_PASS: false,
  PASSWORD_TOO_EZ: false,
  PASSWORD_TOO_EZ_BANK: [
    'fish', 'newyork', 'friend', 'bridge', 
    'banana', 'apple', 'pineapple', 'water', 'gold', 'steve', 'scuba', 'diver', 'orange', 'building', 'street', 'walk', 'weed', 
    'life', 'average', 'food', 'height', 'frog', 'password', 'qwerty', 'guest', 'hotel', 'duh', 'yellow', 'blue', 'red', 'green',
    'yankees', 'lakers', 'bulls', 'giants', 'mets', 'kobe', 'lebron', 'soldier', 'football', 'baseball', 'purple'
  ],
  SIGNUP_PASSWORD_SEE: false,

  EMAIL_UNIQUE: false,
  EMAIL_EXTENSION: false,
  EMAIL_EXTENSION_UI: '',

  USERNAME_UNIQUE: false,
  USERNAME_LENGTH: false,
};

                                    
const loginSignupSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    SET_SEE_LOGIN_OR_SIGNUP: (state, action) => { state.SEE_LOGIN_OR_SIGNUP = action.payload },
    SET_LOGIN_PASSWORD_INPUT: (state, action) => { state.LOGIN_PASSWORD_INPUT = action.payload },
    SET_LOGIN_EMAIL_INPUT: (state, action) => { state.LOGIN_EMAIL_INPUT = action.payload },

    SET_SIGNUP_USERNAME_INPUT: (state, action) => { state.SIGNUP_USERNAME_INPUT = action.payload },
    SET_SIGNUP_EMAIL_INPUT: (state, action) => { state.SIGNUP_EMAIL_INPUT = action.payload },
    SET_SIGNUP_AGE_INPUT: (state, action) => { state.SIGNUP_AGE_INPUT = action.payload },
    SET_SIGNUP_PASSWORD_INPUT: (state, action) => { state.SIGNUP_PASSWORD_INPUT = action.payload },    
    SET_CHECKED: ( state, action) => { state.CHECKED = action.payload },
    TOGGLE_PASSWORD_UPPERCASE: (state) => { state.PASSWORD_UPPERCASE = !state.PASSWORD_UPPERCASE },
    TOGGLE_PASSWORD_SPECIAL_CHAR: (state) => { state.PASSWORD_SPECIAL_CHAR = !state.PASSWORD_SPECIAL_CHAR },
    TOGGLE_PASSWORD_NUMBER_CHAR: (state) => { state.PASSWORD_NUMBER_CHAR = !state.PASSWORD_NUMBER_CHAR },
    TOGGLE_PASSWORD_LENGTH_PASS: (state) => { state.PASSWORD_LENGTH_PASS = !state.PASSWORD_LENGTH_PASS },
    TOGGLE_PASSWORD_TOO_EZ: (state) => { state.PASSWORD_TOO_EZ = !state.PASSWORD_TOO_EZ },
    TOGGLE_SIGNUP_PASSWORD_SEE: (state) => { state.SIGNUP_PASSWORD_SEE = !state.SIGNUP_PASSWORD_SEE },

    TOGGLE_EMAIL_UNIQUE: (state) => { state.EMAIL_UNIQUE = !state.EMAIL_UNIQUE },
    TOGGLE_EMAIL_EXTENSION: (state) => { state.EMAIL_EXTENSION = !state.EMAIL_EXTENSION },
    SET_EMAIL_EXTENSION_UI: (state, action) => { state.EMAIL_EXTENSION_UI = action.payload },
    
    TOGGLE_USERNAME_UNIQUE: (state) => { state.USERNAME_UNIQUE = !state.USERNAME_UNIQUE },
    TOGGLE_USERNAME_LENGTH: (state) => { state.USERNAME_LENGTH = !state.USERNAME_LENGTH },
    
    
  },
});

export const 
{ 
 SET_SEE_LOGIN_OR_SIGNUP, SET_LOGIN_EMAIL_INPUT, SET_LOGIN_PASSWORD_INPUT,
 SET_SIGNUP_USERNAME_INPUT, SET_SIGNUP_EMAIL_INPUT, SET_SIGNUP_AGE_INPUT, SET_SIGNUP_PASSWORD_INPUT, SET_CHECKED,
 TOGGLE_PASSWORD_UPPERCASE, TOGGLE_PASSWORD_SPECIAL_CHAR, TOGGLE_PASSWORD_NUMBER_CHAR, TOGGLE_PASSWORD_LENGTH_PASS, TOGGLE_PASSWORD_TOO_EZ,
 TOGGLE_SIGNUP_PASSWORD_SEE,

 TOGGLE_EMAIL_UNIQUE, TOGGLE_EMAIL_EXTENSION, SET_EMAIL_EXTENSION_UI,

 TOGGLE_USERNAME_UNIQUE, TOGGLE_USERNAME_LENGTH
  
} = loginSignupSlice.actions;

export default loginSignupSlice.reducer;
export type LoginSignupState = LoginSignupSliceState;
