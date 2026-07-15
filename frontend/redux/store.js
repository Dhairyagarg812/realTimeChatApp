import userSlice from "./userSlice"
import messageSlice from "./messageSlice"
import {configureStore} from "@reduxjs/toolkit"
export const store=configureStore({
    reducer:{
        user:userSlice,
        message:messageSlice
    }
})
