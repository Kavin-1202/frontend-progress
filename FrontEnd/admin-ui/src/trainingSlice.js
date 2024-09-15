import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define an async thunk for fetching a single request by ID
export const fetchRequestById = createAsyncThunk(
    'training/fetchRequestById',
    async (requestId) => {
      const response = await axios.get(`http://localhost:9000/accounts/viewRequest/${requestId}`);
      return response.data;
    }
  );
// Async thunk to fetch requests by request name
export const fetchRequestsByRequestName = createAsyncThunk(
  'training/fetchRequestsByRequestName',
  async (name) => {
    const response = await axios.get(`http://localhost:9000/accounts/Dashboard/${name}`);
    return response.data; // Ensure this returns an array
  }
);

// Async thunk to submit a new training request
export const submitTrainingRequest = createAsyncThunk(
  'training/submitTrainingRequest',
  async (requestData) => {
    const response = await axios.post('http://localhost:9000/accounts/sendRequest', requestData);
    return response.data; // Ensure this returns an object with request data
  }
);

// Training slice with initial state and reducers
const trainingSlice = createSlice({
  name: 'training',
  initialState: {
    requests: [], // Ensure this is initialized as an array
    selectedRequest: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestsByRequestName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequestsByRequestName.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = Array.isArray(action.payload) ? action.payload : []; // Ensure this is an array
      })
      .addCase(fetchRequestsByRequestName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitTrainingRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTrainingRequest.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the payload is a single request object, not an array
        state.requests.push(action.payload); 
        toast.success('Data submitted successfully!');
      })
      .addCase(submitTrainingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error('Error submitting data'); // Error toast
      })
      .addCase(fetchRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRequest = action.payload;
      })
      .addCase(fetchRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default trainingSlice.reducer;
