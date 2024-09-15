import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async thunk to fetch all courses for an employee
export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (storedUsername) => {
    const response = await axios.get(`http://localhost:9001/admin/employees/courses/${storedUsername}`);
    return response.data; // Ensure it returns an array of courses
  }
);
// Async thunk to start a course for an employee and get course details
export const startCourse = createAsyncThunk(
  'course/startCourse',
  async ({ storedUsername, courseAssignmentId }) => {
    const response = await axios.get(`http://localhost:9001/admin/employees/${storedUsername}/start/${courseAssignmentId}`);
    return response.data; // Ensure it returns course details DTO
  }
);

// Course slice to manage courses state
const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    courseDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = Array.isArray(action.payload) ? action.payload : []; // Ensure it is an array
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error('Failed to fetch courses.');
      })
      .addCase(startCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courseDetails = action.payload; // Update course details with the response
        toast.success('Course has been started successfully.');
      })
      .addCase(startCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error('Failed to start the course'); // Notify the user on failure
      });
  },
});

export default courseSlice.reducer;
