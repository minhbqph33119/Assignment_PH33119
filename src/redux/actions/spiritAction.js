import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSpirit, clearSpirit } from "../reducers/spiritReducer";

const api_url = 'http://10.0.2.2:3000/spiritManager';

export const fetchSpirit = (uid) => {
    return async dispatch => {
        try {
            const response = await fetch(`${api_url}?userid=${uid}`);
            const data = await response.json();
            dispatch(clearSpirit())
            data.forEach(row => {
                dispatch(addSpirit(row));
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
}

export const addSpiritAPI = createAsyncThunk(
    'spirit/addSpiritAPI',
    async (obj, thunkAPI) => {
        try {
            const response = await fetch(api_url, {
                method: 'POST',
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

export const deleteSpiritAPI = createAsyncThunk(
    'spirit/deleteSpiritAPI',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
)

export const editSpiritAPI = createAsyncThunk(
    'spirit/editSpiritAPI',
    async (obj, thunkAPI) => {
        try {
            const response = await fetch(`${api_url}/${obj.id}`, {
                method: 'PUT',
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
