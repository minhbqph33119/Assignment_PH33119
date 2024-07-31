import { configureStore } from "@reduxjs/toolkit";
import spiritReducer from "../reducers/spiritReducer";
import infoReducer from "../reducers/infoReducer";

const store = configureStore({
    reducer: {
        spirit: spiritReducer,
        info: infoReducer,
    }
});

export default store;
