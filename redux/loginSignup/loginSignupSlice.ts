import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Strain } from 'utility/InterfaceTypes';

interface LoginSignupSliceState {
  // VIEW_SELECTED_STRAIN: Strain<any> ;      generic won't work because the clicked strain needs to have endpoints remove. cant do in effect because it redeclares object with all endpoints

  SEE_LOGIN_OR_SIGNUP: string,

}

const initialState: LoginSignupSliceState = {
  SEE_LOGIN_OR_SIGNUP: '',
};

                                    
const loginSignupSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    SET_SEE_LOGIN_OR_SIGNUP: (state, action) => { state.SEE_LOGIN_OR_SIGNUP = action.payload }
  },
});

export const 
{ 
 SET_SEE_LOGIN_OR_SIGNUP
  
} = loginSignupSlice.actions;

export default loginSignupSlice.reducer;
export type LoginSignupState = LoginSignupSliceState;
