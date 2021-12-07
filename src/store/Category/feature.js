import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import FeatureAPI from './../../api/feature';
export const featuregetAll = createAsyncThunk('feature/featuregetAllAction', async () => {
    const listfeature = await FeatureAPI.getAll();  
    return listfeature;
    
})
export const featureAdd = createAsyncThunk('feature/featureAdd', async (dataAdd,thunkAPI) => {
    await FeatureAPI.create(dataAdd);
    thunkAPI.dispatch(featuregetAll())
})
export  const featureEdit=createAsyncThunk('feature/featureEdit',async(dataEdit,thunkAPI)=>{
    await FeatureAPI.Edit(dataEdit);
    thunkAPI.dispatch(featuregetAll())
})
export  const featureDelete=createAsyncThunk('feature/featureDelete',async(Id,thunkAPI)=>{
    await FeatureAPI.Delete(Id);
    thunkAPI.dispatch(featuregetAll())
})
const featureslide = createSlice({
    name: "featureSlide",
    initialState: {
        featurelist: [],
        loadingfeature: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [featuregetAll.pending]: (state, action) => {
            state.loadingfeature = true;
        },
        [featuregetAll.rejected]: (state, action) => {
                  state.loadingfeature=false
        },
        [featuregetAll.fulfilled]: (state, action) => {
            state.loadingfeature=false;
            state.featurelist=action.payload;
         },
    }
})
const {reducer:featureReducer}=featureslide;
export default featureReducer;