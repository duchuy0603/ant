import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import BrandApi from "../../api/brand";
export const brandgetAll = createAsyncThunk('brand/brandgetAllAction', async () => {
    const listbrand = await BrandApi.getAll();  
    console.log(listbrand)
    return listbrand;
    
})
export const brandAdd = createAsyncThunk('brand/brandAdd', async (newdata,thunkAPI) => {
    await BrandApi.create(newdata);
    thunkAPI.dispatch(brandgetAll())
})
export  const brandEdit=createAsyncThunk('brand/brandEdit',async(newdata,thunkAPI)=>{
    await BrandApi.Edit(newdata);
    thunkAPI.dispatch(brandgetAll())
})
export  const brandDelete=createAsyncThunk('brand/brandDelete',async(Id,thunkAPI)=>{
    await BrandApi.Delete(Id);
    thunkAPI.dispatch(brandgetAll())
})
const brandslide = createSlice({
    name: "brandSlide",
    initialState: {
        brandlist: [],
        loadingbrand: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [brandgetAll.pending]: (state, action) => {
            state.loadingbrand = true;
        },
        [brandgetAll.rejected]: (state, action) => {
                  state.loadingbrand=false
        },
        [brandgetAll.fulfilled]: (state, action) => {
            state.loadingbrand=false;
            state.brandlist=action.payload;
         },
    }
})
const {reducer:brandReducer}=brandslide;
export default brandReducer;