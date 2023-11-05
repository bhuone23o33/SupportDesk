import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService.js"


const initialState = {
    notes: [],
    isLoading: null,
    isError: null,
    isSuccess: null,
    message: ''
}


// getting  ticket notes
export const getNotes = createAsyncThunk('notes/getAll',
    async (ticketId, thunkAPI) => {
        try {
            // if you want to get data from other state then call getState() from thunkAPI
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.getNotes(ticketId, token);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })

// create ticket notes
export const createNote = createAsyncThunk('notes/create',
    async ({ noteText, ticketId }, thunkAPI) => {
        try {
            // if you want to get data from other state then call getState() from thunkAPI
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.createNote(noteText, ticketId, token);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })




export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(createNote.fulfilled, (state, action) => {
                state.notes.push(action.payload);
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
    }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer