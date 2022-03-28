import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AssessApi from "../../api/assess";
export const assessgetAll = createAsyncThunk('assess/assessgetAllAction', async () => {
    const listassess = await AssessApi.getAll();  
    return listassess;
    
})
export const assessAdd = createAsyncThunk('assess/assessAdd', async (dataAdd,thunkAPI) => {
    await AssessApi.create(dataAdd);
    thunkAPI.dispatch(assessgetAll())
})
export  const assessEdit=createAsyncThunk('assess/assessEdit',async(dataEdit,thunkAPI)=>{
    await AssessApi.Edit(dataEdit);
    thunkAPI.dispatch(assessgetAll())
})
export  const assessDelete=createAsyncThunk('assess/assessDelete',async(Id,thunkAPI)=>{
    await AssessApi.Delete(Id);
    thunkAPI.dispatch(assessgetAll())
})
const assessslide = createSlice({
    name: "assessSlide",
    initialState: {
        assesslist: [],
        loadingassess: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [assessgetAll.pending]: (state, action) => {
            state.loadingassess = true;
        },
        [assessgetAll.rejected]: (state, action) => {
                  state.loadingassess=false
        },
        [assessgetAll.fulfilled]: (state, action) => {
            state.loadingassess=false;
            state.assesslist=action.payload;
         },
    }
})
const {reducer:assessReducer}=assessslide;
export default assessReducer;