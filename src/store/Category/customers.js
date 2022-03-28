import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import CustomerApi from './../../api/customer';
export const customergetAll = createAsyncThunk('customer/customergetAllAction', async () => {
    const listcustomer = await CustomerApi.getAll();  
    return listcustomer;
    
})
export const customerAdd = createAsyncThunk('customer/customerAdd', async (dataAdd,thunkAPI) => {
    await CustomerApi.create(dataAdd);
    thunkAPI.dispatch(customergetAll())
})
export  const customerEdit=createAsyncThunk('customer/customerEdit',async(dataEdit,thunkAPI)=>{
    await CustomerApi.Edit(dataEdit);
    thunkAPI.dispatch(customergetAll())
})
export  const customerDelete=createAsyncThunk('customer/customerDelete',async(Id,thunkAPI)=>{
    await CustomerApi.Delete(Id);
    thunkAPI.dispatch(customergetAll())
})
const customerslide = createSlice({
    name: "customerSlide",
    initialState: {
        customerlist: [],
        loadingcustomer: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [customergetAll.pending]: (state, action) => {
            state.loadingcustomer = true;
        },
        [customergetAll.rejected]: (state, action) => {
                  state.loadingcustomer=false
        },
        [customergetAll.fulfilled]: (state, action) => {
            state.loadingcustomer=false;
            state.customerlist=action.payload;
         },
    }
})
const {reducer:customerReducer}=customerslide;
export default customerReducer;