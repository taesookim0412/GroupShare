import axios, {AxiosResponse} from "axios";
import {LoginResponse} from "./LoginInterface";

export function loginFromApi(username: string, password: string) {
    return new Promise<AxiosResponse<LoginResponse>>((resolve) => {
        axios.post("api/login/login", {username: username, password: password}).then((data: AxiosResponse<LoginResponse>) => {
            resolve(data)
        })
    })
}