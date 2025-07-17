import { loadproducts } from "../reducers/Productslice";

// Helper function
const getStoredProducts = () => JSON.parse(localStorage.getItem("products")) || [];

const saveProducts = (products) => localStorage.setItem("products", JSON.stringify(products));

export const asyncloadproduct = () => async (dispatch, getState) => {
    const data = getStoredProducts();
    dispatch(loadproducts(data));
};

export const asyncnewproduct = (product) => async (dispatch, getState) => {
    const products = getStoredProducts();
    const updated = [...products, product];
    saveProducts(updated);
    dispatch(asyncloadproduct());
};

export const asyncupdateproduct = (id, updatedProduct) => async (dispatch, getState) => {
    let products = getStoredProducts();
    products = products.map((prod) => prod.id === id ? { ...prod, ...updatedProduct } : prod);
    saveProducts(products);
    dispatch(asyncloadproduct());
};

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
    const products = getStoredProducts().filter(prod => prod.id !== id);
    saveProducts(products);
    dispatch(asyncloadproduct());
};
