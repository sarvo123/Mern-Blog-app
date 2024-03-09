import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./user/userSlice";

const store = configureStore({
    reducer : {
        user : useReducer,

    }
});
export default store;