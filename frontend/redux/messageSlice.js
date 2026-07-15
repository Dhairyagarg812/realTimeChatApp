import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"message",
    initialState:{
        messages:[]
    },
    reducers:{
        setMesseges:(state,action)=>{
            state.messages=action.payload
        }
    }
})
export  const {setMesseges}=messageSlice.actions;
export default messageSlice.reducer 