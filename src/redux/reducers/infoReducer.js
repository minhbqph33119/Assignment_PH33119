import { createSlice } from "@reduxjs/toolkit"
import { editInfoAPI } from "../actions/infoAction";


const initialState = {
    objinfo: {}
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        addInfo(state, action) {
            state.objinfo = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(editInfoAPI.fulfilled, (state, action) => {
            state.objinfo = action.payload
        }),
            builder.addCase(editInfoAPI.rejected, (state, action) => {
                console.log(action.payload)
            })
    }
})

export const { addInfo } = infoSlice.actions;
export default infoSlice.reducer;
