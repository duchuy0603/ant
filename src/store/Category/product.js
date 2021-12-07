import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import ProductApi from "../../api/product";
export const productgetAll = createAsyncThunk('product/productgetAllAction', async () => {
    const listproduct = await ProductApi.getAll();  
    return listproduct;
    
})
export const productAdd = createAsyncThunk('product/productAdd', async (dataAdd,thunkAPI) => {
    await ProductApi.create(dataAdd);
    thunkAPI.dispatch(productgetAll())
})
export  const productEdit=createAsyncThunk('product/productEdit',async(dataEdit,thunkAPI)=>{
    await ProductApi.Edit(dataEdit);
    thunkAPI.dispatch(productgetAll())
})
export  const productDelete=createAsyncThunk('product/productDelete',async(Id,thunkAPI)=>{
    await ProductApi.Delete(Id);
    thunkAPI.dispatch(productgetAll())
})
const productslide = createSlice({
    name: "productSlide",
    initialState: {
        productlist: [],
        loadingproduct: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [productgetAll.pending]: (state, action) => {
            state.loadingproduct = true;
        },
        [productgetAll.rejected]: (state, action) => {
                  state.loadingproduct=false
        },
        [productgetAll.fulfilled]: (state, action) => {
            state.loadingproduct=false;
            state.productlist=action.payload;
         },
    }
})
const {reducer:productReducer}=productslide;
export default productReducer;