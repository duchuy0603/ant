import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import notificationsAPI from "../../api/notifications";
export const notificationsgetAll = createAsyncThunk('notifications/notificationsgetAllAction', async () => {
    const listnotifications = await notificationsAPI.getAll();  
    console.log(listnotifications)
    return listnotifications;   

})
export const notificationsAdd = createAsyncThunk('notifications/notificationsAdd', async (dataAdd,thunkAPI) => {
    await notificationsAPI.create(dataAdd);
    thunkAPI.dispatch(notificationsgetAll())
})
export  const notificationsEdit=createAsyncThunk('notifications/notificationsEdit',async(dataEdit,thunkAPI)=>{
    await notificationsAPI.Edit(dataEdit);
    thunkAPI.dispatch(notificationsgetAll())
})
export  const notificationsDelete=createAsyncThunk('notifications/notificationsDelete',async(Id,thunkAPI)=>{
    await notificationsAPI.Delete(Id);
    thunkAPI.dispatch(notificationsgetAll())
})
const notificationsslide = createSlice({
    name: "notificationsSlide",
    initialState: {
        notificationslist: [],
        loadingnotifications: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [notificationsgetAll.pending]: (state, action) => {
            state.loadingnotifications = true;
        },
        [notificationsgetAll.rejected]: (state, action) => {
                  state.loadingnotifications=false
        },
        [notificationsgetAll.fulfilled]: (state, action) => {
            state.loadingnotifications=false;
            state.notificationslist=action.payload;
         },
    }
})
const {reducer:notificationsReducer}=notificationsslide;
export default notificationsReducer;