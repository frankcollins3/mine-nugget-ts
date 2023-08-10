import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Strain } from 'utility/InterfaceTypes';

interface familyTreeSliceState {
    PLAYING: boolean

}

const initialState: familyTreeSliceState = {
    PLAYING: false

};

                                    
const familyTreeSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // SET_SEE_LOGIN_OR_SIGNUP: (state, action) => { state.SEE_LOGIN_OR_SIGNUP = action.payload },
    TOGGLE_PLAYING: (state) => { state.PLAYING = !state.PLAYING }

        
  },
});

export const 
{ 
 TOGGLE_PLAYING
  
} = familyTreeSlice.actions;

export default familyTreeSlice.reducer;
export type familyTreeState = familyTreeSliceState;
