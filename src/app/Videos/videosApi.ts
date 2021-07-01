import axios, {AxiosResponse} from "axios";
import {VideoDataResponse} from "./VideoInterfaces";

export function getVideosFromAPI(){
    return new Promise<AxiosResponse<VideoDataResponse>>((resolve) => {
        axios.get("/api/video/all").then((data:AxiosResponse<VideoDataResponse>) =>{
            resolve(data)
        })
    })
}