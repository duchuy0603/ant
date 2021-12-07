import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import UserApi from "../../api/user";
export const usergetAll = createAsyncThunk('user/usergetAllAction', async () => {
    const listuser = await UserApi.getAll();  
    console.log(listuser)
    return listuser;
    
})
export const userAdd = createAsyncThunk('user/userAdd', async (newdata,thunkAPI) => {
    await UserApi.create(newdata);
    console.log(newdata)
    thunkAPI.dispatch(usergetAll())
})
export  const userEdit=createAsyncThunk('user/userEdit',async(newdata,thunkAPI)=>{
    await UserApi.Edit(newdata);
    thunkAPI.dispatch(usergetAll())
})
export  const userDelete=createAsyncThunk('user/userDelete',async(Id,thunkAPI)=>{
    await UserApi.Delete(Id);
    thunkAPI.dispatch(usergetAll())
})
const userslide = createSlice({
    name: "userSlide",
    initialState: {
        userlist: [],
        loadinguser: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [usergetAll.pending]: (state, action) => {
            state.loadinguser = true;
        },
        [usergetAll.rejected]: (state, action) => {
                  state.loadinguser=false
        },
        [usergetAll.fulfilled]: (state, action) => {
            state.loadinguser=false;
            state.userlist=action.payload;
         },
    }
})
const {reducer:userReducer}=userslide;
export default userReducer;