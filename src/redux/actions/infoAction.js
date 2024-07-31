import { createAsyncThunk } from "@reduxjs/toolkit";
import { addInfo } from "../reducers/infoReducer";


const api_url = 'http://10.0.2.2:3000/userManager';

export const fetchInfo = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`${api_url}/${id}`);
            const data = await response.json();
            dispatch(addInfo(data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const editInfoAPI = createAsyncThunk(
    'spirit/editInfoAPI',
    async (obj, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${obj.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)