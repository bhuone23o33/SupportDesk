import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from './ticketService.js'

const initialState = {
    tickets: [],
    ticket: {},
    isLoading: null,
    isError: null,
    isSuccess: null,
    message: ''
}


// create new ticket
export const createTicket = createAsyncThunk('tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            // if you want to get data from other state then call getState() from thunkAPI
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })

// getting  tickets

export const getTickets = createAsyncThunk('tickets/getAll',
    async (_, thunkAPI) => {
        try {
            // if you want to get data from other state then call getState() from thunkAPI
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTickets(token);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })



// getting  ticket
export const getTicket = createAsyncThunk('tickets/get',
    async (ticketId, thunkAPI) => {
        try {
            // if you want to get data from other state then call getState() from thunkAPI
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTicket(ticketId, token);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })


// close  ticket
export const closeTicket = createAsyncThunk('tickets/close',
    async (ticketId, thunkAPI) => {
        try {
            // if you want to get data from other state then call getState() from thunkAPI
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.closeTicket(ticketId, token);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })






export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getTickets.fulfilled, (state, action) => {
                state.tickets = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(getTicket.fulfilled, (state, action) => {
                state.ticket = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets = tickets.map((ticket) => {
                    (ticket._id === action.payload._id)
                        ? (ticket.Status = 'closed')
                        : ticket
                })
            })

    }
})

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;