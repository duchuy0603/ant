import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import PropertyAPi from "../../api/property";
export const propertygetAll = createAsyncThunk('property/propertygetAllAction', async () => {
    const listproperty = await PropertyAPi.getAll();  
    return listproperty;
    
})
export const propertyAdd = createAsyncThunk('property/propertyAdd', async (dataAdd,thunkAPI) => {
    await PropertyAPi.create(dataAdd);
    thunkAPI.dispatch(propertygetAll())
})
export  const propertyEdit=createAsyncThunk('property/propertyEdit',async(dataEdit,thunkAPI)=>{
    await PropertyAPi.Edit(dataEdit);
    thunkAPI.dispatch(propertygetAll())
})
export  const propertyDelete=createAsyncThunk('property/propertyDelete',async(Id,thunkAPI)=>{
    await PropertyAPi.Delete(Id);
    thunkAPI.dispatch(propertygetAll())
})
const propertyslide = createSlice({
    name: "propertySlide",
    initialState: {
        propertylist: [],
        loadingproperty: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [propertygetAll.pending]: (state, action) => {
            state.loadingproperty = true;
        },
        [propertygetAll.rejected]: (state, action) => {
                  state.loadingproperty=false
        },
        [propertygetAll.fulfilled]: (state, action) => {
            state.loadingproperty=false;
            state.propertylist=action.payload;
         },
    }
})
const {reducer:propertyReducer}=propertyslide;
export default propertyReducer;