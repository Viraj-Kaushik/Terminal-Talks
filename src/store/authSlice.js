// slice for authentication service 

import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status : false,
    userData : null,
}

const authSlice = createSlice( {
    name : "auth",
    initialState,
    reducers : {

        login : (state,action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },

        logout : (state,action) => {
            state.status = false;
            // state.userData = null;
            state.userData = {}
        }


    }
} )

// exporting reducers for indivisual uses
export const {login,logout} = authSlice.actions


// exporting all reducers
export default authSlice.reducer;