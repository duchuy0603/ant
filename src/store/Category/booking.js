import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import BookingApi from "../../api/bookings";
export const bookinggetAll = createAsyncThunk('booking/bookinggetAllAction', async () => {
    const listbooking = await BookingApi.getAll();  
    console.log(listbooking)
    return listbooking;
    
})
export const bookingAdd = createAsyncThunk('booking/bookingAdd', async (newdata,thunkAPI) => {
    await BookingApi.create(newdata);
    thunkAPI.dispatch(bookinggetAll())
})
export  const bookingEdit=createAsyncThunk('booking/bookingEdit',async(newdata,thunkAPI)=>{
    await BookingApi.Edit(newdata);
    thunkAPI.dispatch(bookinggetAll())
})
export  const bookingDelete=createAsyncThunk('booking/bookingDelete',async(Id,thunkAPI)=>{
    await BookingApi.Delete(Id);
    thunkAPI.dispatch(bookinggetAll())
})
const bookingslide = createSlice({
    name: "bookingSlide",
    initialState: {
        bookinglist: [],
        loadingbooking: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [bookinggetAll.pending]: (state, action) => {
            state.loadingbooking = true;
        },
        [bookinggetAll.rejected]: (state, action) => {
                  state.loadingbooking=false
        },
        [bookinggetAll.fulfilled]: (state, action) => {
            state.loadingbooking=false;
            state.bookinglist=action.payload;
         },
    }
})
const {reducer:bookingReducer}=bookingslide;
export default bookingReducer;