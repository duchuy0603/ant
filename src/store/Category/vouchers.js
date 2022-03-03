import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import VoucherdApi from "../../api/vouchers";
export const vouchergetAll = createAsyncThunk('voucher/vouchergetAll', async () => {
    const listvoucher = await VoucherdApi.getAll();  
    console.log(listvoucher)
    return listvoucher;   
})
export const voucherAdd = createAsyncThunk('voucher/voucherAdd', async (newdata,thunkAPI) => {
    await VoucherdApi.create(newdata);
    thunkAPI.dispatch(vouchergetAll())
})
export  const voucherEdit=createAsyncThunk('voucher/voucherEdit',async(newdata,thunkAPI)=>{
    await VoucherdApi.Edit(newdata);
    thunkAPI.dispatch(vouchergetAll())
})
export  const voucherDelete=createAsyncThunk('voucher/voucherDelete',async(id,thunkAPI)=>{
    await VoucherdApi.Delete(id);
    thunkAPI.dispatch(vouchergetAll())
})
const voucherslide = createSlice({
    name: "voucherSlide",
    initialState: {
        voucherlist: [],
        loadingecom: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [vouchergetAll.pending]: (state, action) => {
            state.loadingecom = true;
        },
        [vouchergetAll.rejected]: (state, action) => {
                  state.loadingecom=false
        },
        [vouchergetAll.fulfilled]: (state, action) => {
            state.loadingecom=false;
            state.voucherlist=action.payload;
         },
    }
})
const {reducer:voucherReducer}=voucherslide;
export default voucherReducer;