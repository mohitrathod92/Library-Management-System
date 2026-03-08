import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk(
    "auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, userData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Login failed");
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Registration failed");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/auth/logout`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Logout failed");
        }
    }
);

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Session expired");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: null,
        message: null,
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        resetAuthSlice: (state) => {
            state.error = null;
            state.message = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.message = action.payload.message;
            })
            // Fetch User
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            });
    },
});

export const { resetAuthSlice } = authSlice.actions;
export default authSlice.reducer;
