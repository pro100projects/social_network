import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// API
import API from "../../database/AuthAPI";
// OTHER
import exceptionsCodes from "../../component/util/exception/exceptionsCodes";

const nameOfSlice = 'userSlice';

export const login = createAsyncThunk(
    'login',
    async (userCreate, { rejectWithValue }) => {
        try {
            return await API.login(userCreate);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);

export const initUser = createAsyncThunk(
    'initUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            let jwtToken = getState().user.jwtToken;
            console.log(jwtToken);
            return await API.getUser(jwtToken);
        } catch (ex) {
            return rejectWithValue('Opps there seems to be an error')
        }
    }
);

const userSlice = createSlice({
    name: nameOfSlice,
    initialState: {
        jwtToken: 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpZCI6MywiZXhwIjoxNjU1MzI2ODAwLCJlbWFpbCI6InZhZGltQGdtYWlsLmNvbSIsImVuYWJsZWQiOnRydWV9.LsxKcdlYa0BHjQUK1ExjQpB6QrTAx0T5YGDTkb3dvZuPvEnIlwGV040Anws_IRXa_OCv12dj5KSXIQsSpCDSmA',
        user: {
            "id": 3,
            "avatar": null,
            "name": "Вадім",
            "surname": "Скуратовський",
            "username": "vadim",
            "email": "vadim@gmail.com",
            "phone": "380958827299",
            "sex": "MALE"
        },
        isLoadingLogin: false,
        error: '',
        validation: ''
    },
    reducers: {
        logout: (state) => {
            state.jwtToken = '';
            state.user = {};
        },
        clearValidation: (state) => {
            state.validation = "";
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoadingLogin = true;
        },
        [login.fulfilled]: (state, {payload}) => {
            if (!payload.jwtToken) {
                state.validation = exceptionsCodes(payload.errorCode);
            }
            else {
                state.validation = '';
                state.jwtToken = payload.jwtToken;
            }

            state.isLoadingLogin = false;
        },
        [login.rejected]: (state, {payload}) => {
            state.error = payload;
            state.isLoadingLogin = false;
        },

        [initUser.pending]: (state) => {
            state.isLoadingLogin = true;
        },
        [initUser.fulfilled]: (state, {payload}) => {
            state.user = payload;
            state.isLoadingLogin = false;
        },
        [initUser.rejected]: (state, {payload}) => {
            state.error = payload;
            state.isLoadingLogin = false;
        },
    }
    });

export const { logout, clearValidation } = userSlice.actions;
export default userSlice.reducer;
