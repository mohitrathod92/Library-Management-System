import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBooks = createAsyncThunk(
    "book/fetchBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/book/all`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch books");
        }
    }
);

export const addBook = createAsyncThunk(
    "book/addBook",
    async (/** @type {any} */ bookData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/book/admin/add`, bookData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add book");
        }
    }
);

export const deleteBook = createAsyncThunk(
    "book/deleteBook",
    async (/** @type {any} */ id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/book/delete/${id}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete book");
        }
    }
);

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        books: [],
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload.books;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bookSlice.reducer;
