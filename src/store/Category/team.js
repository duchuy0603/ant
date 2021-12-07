import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import TeamApi from "../../api/team";
export const teamgetAll = createAsyncThunk('team/teamgetAllAction', async () => {
    const listteam = await TeamApi.getAll();  
    return listteam;
    
})
export const teamAdd = createAsyncThunk('team/teamAdd', async (newdata,thunkAPI) => {
    await TeamApi.create(newdata);
    thunkAPI.dispatch(teamgetAll())
})
export  const teamEdit=createAsyncThunk('team/teamEdit',async(newdata,thunkAPI)=>{
    await TeamApi.Edit(newdata);
    thunkAPI.dispatch(teamgetAll())
})
export  const teamDelete=createAsyncThunk('team/teamDelete',async(Id,thunkAPI)=>{
    await TeamApi.Delete(Id);
    thunkAPI.dispatch(teamgetAll())
})
const teamslide = createSlice({
    name: "teamSlide",
    initialState: {
        teamlist: [],
        loadingteam: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [teamgetAll.pending]: (state, action) => {
            state.loadingteam = true;
        },
        [teamgetAll.rejected]: (state, action) => {
                  state.loadingteam=false
        },
        [teamgetAll.fulfilled]: (state, action) => {
            state.loadingteam=false;
            state.teamlist=action.payload;
         },
    }
})
const {reducer:teamReducer}=teamslide;
export default teamReducer;