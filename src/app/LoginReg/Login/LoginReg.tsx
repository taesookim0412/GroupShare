import React, {ChangeEvent} from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    selectErrors,
    selectUsernameErrors,
    selectPassword,
    selectUsername,
    setPasswordError,
    setUsernameError,
    selectPasswordErrors,
    setUsername,
    setPassword,
    loginFromApiAsync,
    selectLoginState,
    setLoggedIn,
    setToken
} from "./loginSlice";
import {LoginResponse} from "./LoginInterface";
import {PayloadAction} from "@reduxjs/toolkit";
import {useHistory} from "react-router-dom";

export function Login() {
    const dispatch = useAppDispatch()
    const loginState = useAppSelector(selectLoginState)
    const username = useAppSelector(selectUsername)
    const password = useAppSelector(selectPassword)
    const errorsUsername = useAppSelector(selectUsernameErrors)
    const errorsPassword = useAppSelector(selectPasswordErrors)
    const minUserLen = 4
    const minPassLen = 4
    const history = useHistory()

    function handleChange(inputName: string, newStr: string) {
        switch (inputName) {
            case "username":
                if (newStr.length < minUserLen) {
                    dispatch(setUsernameError(`Username must be at least ${minUserLen} characters long!`))
                } else {
                    dispatch(setUsernameError(""))
                }
                break
            case "password":
                if (newStr.length < minPassLen) {
                    dispatch(setPasswordError(`Password must be at least ${minPassLen} characters long!`))
                } else {
                    dispatch(setPasswordError(""))
                }
                break
        }
    }

    function handleSubmit() {
        if (username.length < minUserLen || password.length < minPassLen) return;
        dispatch(loginFromApiAsync(loginState)).then((res:PayloadAction<LoginResponse | any>) => {
            if (res.payload.status === "successful"){
                //jwt here
                localStorage.setItem("username", res.payload.username)
                localStorage.setItem("token", res.payload.token)
                localStorage.setItem("expiresAt", Date.now() + res.payload.expiresIn)
                //TODO: (SEVERE) HTTP COOKIE
                document.cookie = res.payload.token
                dispatch(setLoggedIn(true))
                dispatch(setToken(res.payload.token))
                history.push("/")
            }
            else if (res.payload.status === "wrong_password"){
                dispatch(setPasswordError("Incorrect Password!"))
            }
            else {
                dispatch(setUsernameError("Incorrect Login Details!"))
                dispatch(setPasswordError("Incorrect Login Details!"))
            }
        })
    }

    return (
        <div style={{textAlign: "center"}}>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <label>
                    Username:<br/>
                    <input type={"text"} name={"username"} value={username} onChange={(e) => {
                        dispatch(setUsername(e.target.value));
                        handleChange("username", e.target.value);
                    }}/><br/>
                    {errorsUsername}
                </label><br/>
                <label>
                    Password:<br/>
                    <input type={"password"} name={"password"} value={password}
                           onChange={(e) => {
                               dispatch(setPassword(e.target.value));
                               handleChange("password", e.target.value);
                           }}/><br/>
                    {errorsPassword}
                </label><br/>
                <br/>
                <input type={"submit"} value={"Login"}/>
            </form>
        </div>
    );
}