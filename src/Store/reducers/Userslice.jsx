import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    users: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => { 
            state.users=action.payload;
        },
         removeuser: (state, action) => { 
            state.users=null;
        }
    },  
})
export const { loaduser,removeuser } = userSlice.actions;
export default userSlice.reducer