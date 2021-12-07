import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import NewAPI from "../../api/new";
export const newgetAll = createAsyncThunk('new/newgetAllAction', async () => {
    const listnew = await NewAPI.getAll();  
    return listnew;   
})
export const newAdd = createAsyncThunk('new/newAdd', async (dataAdd,thunkAPI) => {
    await NewAPI.create(dataAdd);
    thunkAPI.dispatch(newgetAll())
})
export  const newEdit=createAsyncThunk('new/newEdit',async(dataEdit,thunkAPI)=>{
    await NewAPI.Edit(dataEdit);
    thunkAPI.dispatch(newgetAll())
})
export  const newDelete=createAsyncThunk('new/newDelete',async(Id,thunkAPI)=>{
    await NewAPI.Delete(Id);
    thunkAPI.dispatch(newgetAll())
})
const newslide = createSlice({
    name: "newSlide",
    initialState: {
        newlist: [],
        loadingnew: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [newgetAll.pending]: (state, action) => {
            state.loadingnew = true;
        },
        [newgetAll.rejected]: (state, action) => {
                  state.loadingnew=false
        },
        [newgetAll.fulfilled]: (state, action) => {
            state.loadingnew=false;
            state.newlist=action.payload;
         },
    }
})
const {reducer:newReducer}=newslide;
export default newReducer;