import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import EventApi from "../../api/event";
export const eventsgetAll=createAsyncThunk('events/eventsgerAll',async()=>{
    const listevent=await EventApi.getAll();
    console.log('huyhhahah', listevent)
    return listevent;
})
export const eventsAdd=createAsyncThunk('events/eventsAdd',async(data,thunkApi)=>{
    await EventApi.create(data);
    thunkApi.dispatch(eventsgetAll())
})
export const eventsEdit=createAsyncThunk('events/eventsEdit',async(data,thunkApi)=>{
    await EventApi.Edit(data);
    thunkApi.dispatch(eventsgetAll())
})
export const eventsDelete=createAsyncThunk('events/eventsDelete',async(data,thunkApi)=>{
    await EventApi.Delete(data);
    thunkApi.dispatch(eventsgetAll())
})
const eventsslide=createSlice({
    name:"eventsSlide",
    initialState:{
        eventslist:[],
        eventsloading:"",
        error:"",
    },
    reducers:{

    },
    extraReducers:{
[eventsgetAll.pending]:(state,action)=>{
    state.eventsloading=true;
},
[eventsgetAll.rejected]:(state,action)=>{
    state.eventsloading=false
},
[eventsgetAll.fulfilled]:(state,action)=>{
    state.eventsloading=false;
    state.eventslist=action.payload;
    }
}
})
const {reducer:eventsReducer}=eventsslide;
export default eventsReducer;