import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService.js';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
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
        try {
            return await authService.login(user);
        } catch (error) {
            const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message);
        }
    })


// logout  user
export const logout = createAsyncThunk('auth/logout',
    async () => {
        await authService.logout()
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
            // when logout is pending
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            // when logout will fullfilled
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            // when result of login is still pending
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            // when data of login confirmed or fullfilled
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            // when something went wrong in login
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
    }
})


export const { reset } = authSlice.actions
export default authSlice.reducer