import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { saveToken } from "../../helpers/common";
import { saveUser } from "../../helpers/common";
import { getUserFromLocalStorage } from "../../helpers/common";
const authslide = createSlice({
    name: "authSlide",
    initialState: {
        authlist: [],
        loadingauth: false,
        error: ''
    },
    reducers: {
        savetoken: (state, action) => {
            saveToken(action.payload.access_token)
           
        },
        saveuser:(state,action)=>{
            saveUser(action.payload)         
            state.authlist = action.payload
            // localStorage.setItem('role', action.payload.user_infor.type)
           
        }
    },
    extraReducers: {

    }
})

const { reducer: authReducer } = authslide;
export const { savetoken ,saveuser} = authslide.actions
export default authReducer;