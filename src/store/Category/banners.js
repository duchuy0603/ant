import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import BannersApi from "../../api/banner";
export const bannersgetAll = createAsyncThunk('banner/bannergetAllAction', async () => {
    const listbanner = await BannersApi.getAll();  
    console.log(listbanner)
    return listbanner;
    
})
export const bannersAdd = createAsyncThunk('banner/bannerAdd', async (newdata,thunkAPI) => {
    await BannersApi.create(newdata);
    thunkAPI.dispatch(bannersgetAll())
})
export  const bannersEdit=createAsyncThunk('banner/bannerEdit',async(newdata,thunkAPI)=>{
    await BannersApi.Edit(newdata);
    thunkAPI.dispatch(bannersgetAll())
})
export  const bannersDelete=createAsyncThunk('banner/bannerDelete',async(Id,thunkAPI)=>{
    await BannersApi.Delete(Id);
    thunkAPI.dispatch(bannersgetAll())
})
const bannerslide = createSlice({
    name: "bannerSlide",
    initialState: {
        bannerslist: [],
        loadingbanner: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [bannersgetAll.pending]: (state, action) => {
            state.loadingbanner = true;
        },
        [bannersgetAll.rejected]: (state, action) => {
                  state.loadingbanner=false
        },
        [bannersgetAll.fulfilled]: (state, action) => {
            state.loadingbanner=false;
            state.bannerslist=action.payload;
         },
    }
})
const {reducer:bannerReducer}=bannerslide;
export default bannerReducer;