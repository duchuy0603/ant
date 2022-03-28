import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import RoleApi from './../../api/roles';
export const rolegetAll = createAsyncThunk('role/rolegetAllAction', async () => {
    const listrole = await RoleApi.getAll();  
  
    return listrole;
    
})
export const roleAdd = createAsyncThunk('role/roleAdd', async (dataAdd,thunkAPI) => {
    await RoleApi.create(dataAdd);
 
    thunkAPI.dispatch(rolegetAll())
})
export  const roleEdit=createAsyncThunk('role/roleEdit',async(dataEdit,thunkAPI)=>{
    await RoleApi.Edit(dataEdit);
    console.log(dataEdit)
    thunkAPI.dispatch(rolegetAll())
})
export  const roleDelete=createAsyncThunk('role/roleDelete',async(Id,thunkAPI)=>{
    await RoleApi.Delete(Id);
    thunkAPI.dispatch(rolegetAll())
})
const roleslide = createSlice({
    name: "roleSlide",
    initialState: {
        rolelist: [],
        loadingrole: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [rolegetAll.pending]: (state, action) => {
            state.loadingrole = true;
        },
        [rolegetAll.rejected]: (state, action) => {
                  state.loadingrole=false
        },
        [rolegetAll.fulfilled]: (state, action) => {
            state.loadingrole=false;
            state.rolelist=action.payload;
         },
    }
})
const {reducer:roleReducer}=roleslide;
export default roleReducer;