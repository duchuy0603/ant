import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import ecommerceApi from "../../api/ecommerce";
export const ecommercegetAll = createAsyncThunk('ecommerce/ecommercegetAll', async () => {
    const listecommerce = await ecommerceApi.getAll();  
    return listecommerce;   
})
export const ecommerceAdd = createAsyncThunk('ecommerce/ecommerceAdd', async (newdata,thunkAPI) => {
    await ecommerceApi.create(newdata);
    thunkAPI.dispatch(ecommercegetAll())
})
export  const ecommerceEdit=createAsyncThunk('ecommerce/ecommerceEdit',async(newdata,thunkAPI)=>{
    await ecommerceApi.Edit(newdata);
    thunkAPI.dispatch(ecommercegetAll())
})
export  const ecommerceDelete=createAsyncThunk('ecommerce/ecommerceDelete',async(Id,thunkAPI)=>{
    await ecommerceApi.Delete(Id);
    thunkAPI.dispatch(ecommercegetAll())
})
const ecommerceslide = createSlice({
    name: "ecommerceSlide",
    initialState: {
        ecommercelist: [],
        loadingecom: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [ecommercegetAll.pending]: (state, action) => {
            state.loadingecom = true;
        },
        [ecommercegetAll.rejected]: (state, action) => {
                  state.loadingecom=false
        },
        [ecommercegetAll.fulfilled]: (state, action) => {
            state.loadingecom=false;
            state.ecommercelist=action.payload;
         },
    }
})
const {reducer:ecommerceReducer}=ecommerceslide;
export default ecommerceReducer;