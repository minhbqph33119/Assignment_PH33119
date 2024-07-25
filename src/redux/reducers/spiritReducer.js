import { createSlice } from "@reduxjs/toolkit"
import { addSpiritAPI, deleteSpiritAPI, editSpiritAPI } from "../actions/spiritAction";

const initialState = {
    listSpirit: []
}

const spiritSlice = createSlice({
    name: 'spirit',
    initialState,
    reducers: {
        addSpirit(state, action) {
            state.listSpirit.push(action.payload);
        },
        clearSpirit(state, action) {
            state.listSpirit.length = 0;
        }
    },
    extraReducers: builder => {
        builder.addCase(addSpiritAPI.fulfilled, (state, action) => {
            state.listSpirit.push(action.payload);
        });
        builder.addCase(addSpiritAPI.rejected, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(deleteSpiritAPI.fulfilled, (state, action) => {
            state.listSpirit = state.listSpirit.filter(spirit => spirit.id != action.payload.id)
        });
        builder.addCase(deleteSpiritAPI.rejected, (state, action) => {
            console.log(action.payload);
        });
        builder.addCase(editSpiritAPI.fulfilled, (state, action) => {
            state.listSpirit = state.listSpirit.map(spirit => spirit.id === action.payload.id ? action.payload : spirit);
        });
        builder.addCase(editSpiritAPI.rejected, (state, action) => {
            console.log(action.payload);
        })
    }
});

export const { addSpirit, clearSpirit } = spiritSlice.actions;
export default spiritSlice.reducer;
