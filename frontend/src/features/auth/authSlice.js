import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService.js';

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// for to call async function (nameString,async function)
// register a user
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })

// login a user
export const login = createAsyncThunk('auth/login',
    async (user, thunkAPI) => {
        console.log(user);
    })



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            // when result from the api is still pending
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            // when data is arrived 
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            // when something went wrong/error
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    }
})


export const { reset } = authSlice.actions
export default authSlice.reducer