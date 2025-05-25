import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'

const store = configureStore({
    // telling about all the reducers
    reducer:{
        auth : authSlice        // section/slice named auth is made
    }
});

export default store;