// store.js
import { configureStore } from '@reduxjs/toolkit';
import trainingReducer from './trainingSlice';
import courseReducer from './courseSlice';

const store = configureStore({
  reducer: {
    training: trainingReducer,
    course: courseReducer,
  },
});

export default store;
