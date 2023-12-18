import {configureStore} from '@reduxjs/toolkit';
import {blogApi} from '../services/apiSlice';
import  sessionReducer from '../features/session/sessionSlice';

export const store = configureStore({
    reducer:{
        [blogApi.reducerPath]: blogApi.reducer,
        session: sessionReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
})
