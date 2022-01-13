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
            saveToken(action.payload.AccessToken)
        },
        saveuser:(state,action)=>{
            saveUser(action.payload)         
            state.authlist = action.payload
            localStorage.setItem('role', action.payload.Type)
        }
    },
    extraReducers: {

    }
})

const { reducer: authReducer } = authslide;
export const { savetoken ,saveuser} = authslide.actions
export default authReducer;