import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { csrfFetch } from '../../store/csrf';


const initialState = {
    user: [],
    status: 'idle',
    errors: [],
    isOwner: false,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState,
    reducers:{},
    extraReducers(builder) {
        // Add reducers here
        builder
        .addCase(login.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.errors.push(action.error.message);
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user.push(action.payload);
            state.isOwner = true;
            //state.loginStatus = true;
        })
        .addCase(signup.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user.push(action.payload);
        })
        .addCase(signup.rejected, (state, action) => {
            state.status = 'failed';
            state.errors.push(action.error.message);
        })
        .addCase(restoreUser.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(restoreUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user.push(action.payload);
            //state.sessionRestored = true;
        })
        .addCase(restoreUser.rejected, (state, action) => {
            state.status = 'failed';
            state.errors.push(action.error.message);
        })
        .addCase(logout.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user.push(action.payload);
            state.isOwner = false;
        })
        .addCase(logout.rejected, (state, action) => {
            state.status = 'failed';
            state.errors.push(action.error.message);
        })
    }
})


export const login = createAsyncThunk('session/login', async function (user) {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    console.log(data);
    return data.user;
})

export const signup = createAsyncThunk('session/signup', async function (user) {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/session/signup', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    });
    const data = await response.json();
    return data.user;
})

export const logout = createAsyncThunk('session/logout', async function () {
    const response = await csrfFetch('/api/session/logout', {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
})

export const restoreUser = createAsyncThunk('session/restoreUser', async function () {
    const response = await csrfFetch('/api/session/restore');
    const data = await response.json();
    return data.user;
})

export default sessionSlice.reducer;
