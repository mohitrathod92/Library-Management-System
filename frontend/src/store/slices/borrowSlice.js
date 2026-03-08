import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const recordBorrowedBook = createAsyncThunk(
    "borrow/recordBorrowedBook",
    async (/** @type {any} */ { id, email, customDueDate, customPrice }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API_URL}/borrow/record-borrow-book/${id}`,
                { email, customDueDate, customPrice },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to record borrow");
        }
    }
);

export const returnBorrowedBook = createAsyncThunk(
    "borrow/returnBorrowedBook",
    async (/** @type {any} */ { id, email }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/borrow/return-borrowed-book/${id}`,
                { email },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to return book");
        }
    }
);

export const fetchMyBorrowedBooks = createAsyncThunk(
    "borrow/fetchMyBorrowedBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/borrow/my-borrowed-books`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch borrowed books");
        }
    }
);

export const fetchAdminBorrowedBooks = createAsyncThunk(
    "borrow/fetchAdminBorrowedBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/borrow/borrowed-books-by-users`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch admin borrow data");
        }
    }
);

const borrowSlice = createSlice({
    name: "borrow",
    initialState: {
        loading: false,
        myBorrowedBooks: [],
        adminBorrowedBooks: [],
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyBorrowedBooks.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchMyBorrowedBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.myBorrowedBooks = action.payload.borrowedBooks;
            })
            .addCase(fetchMyBorrowedBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchAdminBorrowedBooks.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAdminBorrowedBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.adminBorrowedBooks = action.payload.borrowedBooks;
            })
            .addCase(fetchAdminBorrowedBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(recordBorrowedBook.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(recordBorrowedBook.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
            .addCase(recordBorrowedBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(returnBorrowedBook.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(returnBorrowedBook.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
            .addCase(returnBorrowedBook.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export default borrowSlice.reducer;
