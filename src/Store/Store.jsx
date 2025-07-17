import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/Userslice'
import productSlice from './reducers/Productslice'

export const store = configureStore({
    reducer: {
        userreducer: userSlice,
        productreducer: productSlice,
    },
})