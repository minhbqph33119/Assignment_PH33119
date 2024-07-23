import { configureStore } from "@reduxjs/toolkit";
import spiritReducer from "../reducers/spiritReducer";

const store = configureStore({
    reducer: {
        spirit: spiritReducer
    }
});

export default store;
