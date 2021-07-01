import {useAppDispatch, useAppSelector} from "../hooks";
import {getVideos, getVideosFromApiAsync, setVideos} from "../Videos/videosSlice";
import {Video, VideoDataResponse} from "../Videos/VideoInterfaces";
import {PayloadAction} from "@reduxjs/toolkit";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {setVideo} from "../OneVideo/oneVideoSlice";

export function Home() {
    const dispatch = useAppDispatch()
    const allVideos = useAppSelector(getVideos)
    const history = useHistory()

    useEffect(() => {
        dispatch(getVideosFromApiAsync())
        //Shows the format for videos
    }, [])

    function onClickVideo(id:string, i:number){
        dispatch(setVideo(allVideos[i]))
        history.push(`/watch/${id}`)
    }

    let i = -1;
    const rows = allVideos.map((video) => {
        i += 1
        return (
            <li style={{padding: "20px 0px 20px 0px"}} onClick={() => onClickVideo(video._id, i)}>
                {/*<img src={video.thumbnail}/>*/}<img src={"https://getuikit.com/v2/docs/images/placeholder_600x400.svg"}/>
                {video.title} <br/>
                {/*{video.author}*/} AuthorName
                {video.views} Views
            </li>
        )
    })
    return (
        <div style={{display: "table", margin: "auto"}}>
            <ul>
                {rows}
            </ul>
            Welcome home!
        </div>
    )
}