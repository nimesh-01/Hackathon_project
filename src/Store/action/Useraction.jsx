import { loaduser, removeuser } from "../reducers/Userslice";
import { toast } from "react-toastify";

const getStoredUsers = () => JSON.parse(localStorage.getItem("users")) || [];

const saveUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) dispatch(loaduser(loggedUser));
    else console.log("User not logged in");
  } catch (error) {
    console.log(error);
  }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
  localStorage.removeItem("user");
  dispatch(removeuser());
};

export const asyncloginuser = (user) => async (dispatch, getState) => {
  const users = getStoredUsers();
  const match = users.find(
    (u) => u.email === user.email && u.password === user.password
  );
  if (match) {
    localStorage.setItem("user", JSON.stringify(match));
    dispatch(loaduser(match));
    toast.success("Logged in", { autoClose: 800 });
    return true;
  } else {
    console.log("Invalid credentials");
    return false;
  }
};

export const asyncregisteruser = (user) => async (dispatch, getState) => {
  const users = getStoredUsers();
  const updated = [...users, user];
  saveUsers(updated);
  console.log("User registered");
};

export const asyncupdateprofile = (id, user) => async (dispatch, getState) => {
  console.log("🔵 Incoming user:", user);

  let users = getStoredUsers();
  const products = JSON.parse(localStorage.getItem("products")) || [];

  console.log("🟢 Products in localStorage:", products);
  console.log("🟢 Product IDs:", products.map(p => p.id));

  const cart = user.cart || [];
  console.log("🟡 User cart before filtering:", cart);
  console.log("🟡 Cart item IDs:", cart.map(c => c.id));

  // ✅ Fix: compare IDs as strings to avoid type mismatch
  const validCart = cart.filter(cartItem =>
    products.some(product => String(product.id) === String(cartItem.id))
  );

  console.log("✅ Filtered valid cart:", validCart);

  const updatedUser = { ...user, cart: validCart };

  // ✅ Update in user list
  users = users.map(u => u.id === id ? updatedUser : u);
  saveUsers(users);

  // ✅ Update current logged-in user
  localStorage.setItem("user", JSON.stringify(updatedUser));

  dispatch(asynccurrentuser());
};




export const asyncdeleteprofile = (id) => async (dispatch, getState) => {
  const users = getStoredUsers().filter((u) => u.id !== id);
  saveUsers(users);
  dispatch(asynclogoutuser());
};
export const cleanDeletedProductsFromAllCarts = () => {
  const users = getStoredUsers();
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const cleanedUsers = users.map(user => {
    const validCart = (user.cart || []).filter(cartItem =>
      products.some(product => product.id === cartItem.id)
    );
    return { ...user, cart: validCart };
  });

  saveUsers(cleanedUsers);
};
