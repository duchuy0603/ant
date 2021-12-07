import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import CategoriesAPI from "../../api/category";
export const categoriesgetAll = createAsyncThunk('categories/categoriesgetAll', async () => {
    const listcategories = await CategoriesAPI.getAll();  
 
    return listcategories;
  
    
})
export const categoriesAdd = createAsyncThunk('categories/categoriesAdd', async (newdata,thunkAPI) => {
    await CategoriesAPI.create(newdata);
    thunkAPI.dispatch(categoriesgetAll())
})
export  const categoriesEdit=createAsyncThunk('categories/categoriesEdit',async(newdata,thunkAPI)=>{
    await CategoriesAPI.Edit(newdata);
    thunkAPI.dispatch(categoriesgetAll())
})
export  const categoriesDelete=createAsyncThunk('categories/categoriesDelete',async(Id,thunkAPI)=>{
    await CategoriesAPI.Delete(Id);
    thunkAPI.dispatch(categoriesgetAll())
})
const categoriesslide = createSlice({
    name: "categoriesSlide",
    initialState: {
        categorieslist: [],
        loadingcategories: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [categoriesgetAll.pending]: (state, action) => {
            state.loadingcategories = true;
        },
        [categoriesgetAll.rejected]: (state, action) => {
                  state.loadingcategories=false
        },
        [categoriesgetAll.fulfilled]: (state, action) => {
            state.loadingcategories=false;
            state.categorieslist=action.payload;
         },
    }
})
const {reducer:categoriesReducer}=categoriesslide;
export default categoriesReducer;