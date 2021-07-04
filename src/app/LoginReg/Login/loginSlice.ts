import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios'
import {getOneVideoFromAPI} from "../../OneVideo/oneVideoApi";
import {loginFromApi} from "./loginApi";
import {LoginResponse} from "./LoginInterface";
import {RootState} from "../../store";

export interface LoginErrors {
    username: string,
    password: string
}

export interface LoginState {
    status: string,
    username: string,
    password: string,
    errors: LoginErrors,
    loggedIn: boolean,
    token: string
}

const initialState: LoginState = {
    status: "",
    username: "user",
    password: "pass",
    errors: {
        username: "",
        password: ""
    },
    loggedIn: checkIfLoggedIn(),
    token: (!!localStorage.username || !!document.cookie) ? document.cookie : ""
};

function checkIfLoggedIn() {
    if (localStorage.expiresAt === undefined || localStorage.expiresAt < Date.now()) {
        document.cookie = ""
        return false
    } else {
        return true;
    }

}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginFromApiAsync = createAsyncThunk(
    'login/loginFromApi',
    async (state: LoginState) => {
        const response = await loginFromApi(state.username, state.password);
        // // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setUsername: (state, username: PayloadAction<string>) => {
            state.username = username.payload
        },
        setPassword: (state, password: PayloadAction<string>) => {
            state.password = password.payload
        },
        setUsernameError: (state, param: PayloadAction<string>) => {
            state.errors.username = param.payload
        },
        setPasswordError: (state, param: PayloadAction<string>) => {
            state.errors.password = param.payload
        },
        setLoggedIn: (state, param: PayloadAction<boolean>) => {
            state.loggedIn = param.payload
        },
        setToken: (state, param: PayloadAction<string>) => {
            state.token = param.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginFromApiAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginFromApiAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
    },
})

export const {
    setUsername,
    setPassword,
    setUsernameError,
    setPasswordError,
    setLoggedIn,
    setToken

} = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLoginState = (state: RootState) => state.login
export const selectUsername = (state: RootState) => state.login.username
export const selectPassword = (state: RootState) => state.login.password
export const selectErrors = (state: RootState) => state.login.errors
export const selectUsernameErrors = (state: RootState) => state.login.errors.username
export const selectPasswordErrors = (state: RootState) => state.login.errors.password
export const selectLoggedIn = (state: RootState) => state.login.loggedIn
export const selectToken = (state: RootState) => state.login.token

export default loginSlice.reducer;