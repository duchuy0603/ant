import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import StoreApi from "../../api/stores";
export const storegetAll = createAsyncThunk('store/storegetAllAction', async () => {
    const liststore = await StoreApi.getAll();  
  
    return liststore;
    
})
export const storeAdd = createAsyncThunk('store/storeAdd', async (dataAdd,thunkAPI) => {
    await StoreApi.create(dataAdd);
 
    thunkAPI.dispatch(storegetAll())
})
export  const storeEdit=createAsyncThunk('store/storeEdit',async(dataEdit,thunkAPI)=>{
    await StoreApi.Edit(dataEdit);
    console.log(dataEdit)
    thunkAPI.dispatch(storegetAll())
})
export  const storeDelete=createAsyncThunk('store/storeDelete',async(Id,thunkAPI)=>{
    await StoreApi.Delete(Id);
    thunkAPI.dispatch(storegetAll())
})
const storeslide = createSlice({
    name: "storeSlide",
    initialState: {
        storelist: [],
        loadingstore: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [storegetAll.pending]: (state, action) => {
            state.loadingstore = true;
        },
        [storegetAll.rejected]: (state, action) => {
                  state.loadingstore=false
        },
        [storegetAll.fulfilled]: (state, action) => {
            state.loadingstore=false;
            state.storelist=action.payload;
         },
    }
})
const {reducer:storeReducer}=storeslide;
export default storeReducer;