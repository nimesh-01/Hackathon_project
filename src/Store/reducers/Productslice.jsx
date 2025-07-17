import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
}
const ProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        loadproducts: (state, action) => { 
            state.products=action.payload;
        },
    },  
})
export const { loadproducts } =ProductSlice .actions;
export default ProductSlice.reducer