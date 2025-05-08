import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import ordersReducer from "../features/orders/ordersSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/products/productsSlice"
import usersReducer from "../features/users/usersSlice"


const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  orders: ordersReducer,
  categories: categoriesReducer,
  products: productsReducer,
  users: usersReducer,

});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart", "orders", "categories", "products", "users"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
