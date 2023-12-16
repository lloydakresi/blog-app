import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blog/blogSlice';
import { csrfFetch, restoreCSRF } from './csrf';
import sessionReducer from '../features/session/sessionSlice';

export const store = configureStore({
    reducer:{
        //add reducers here
        blog: blogReducer,
        session: sessionReducer,

    }
})

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
  }
