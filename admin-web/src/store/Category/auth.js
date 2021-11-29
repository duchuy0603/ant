import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


const authslide = createSlice({
    name: "authSlide",
    initialState: {
        authlist: [],
        loadingauth: false,
        error: ''
    },
    reducers: {
savetoken:(state,action)=>{
 localStorage.setItem('token',action.payload)
 state.authlist=action.payload
}
    
    
    },
    extraReducers: {
  
    }
})

const {reducer:authReducer}=authslide;
export const {savetoken}=authslide.actions
export default authReducer;