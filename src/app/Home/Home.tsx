import {useAppDispatch, useAppSelector} from "../hooks";
import {getVideos, getVideosFromApiAsync, setVideos} from "../Videos/videosSlice";
import {Video, VideoDataResponse} from "../Videos/VideoInterfaces";
import {PayloadAction} from "@reduxjs/toolkit";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {setVideo} from "../OneVideo/oneVideoSlice";
import "./Home.scss"

export function Home() {
    const dispatch = useAppDispatch()
    const allVideos = useAppSelector(getVideos)
    const history = useHistory()

    useEffect(() => {
        dispatch(getVideosFromApiAsync())
        //Shows the format for videos
    }, [])

    function onClickVideo(id: string) {
        history.push(`/watch/${id}`)
    }

    const rows = allVideos?.map((video) => {
        return (
            <div className={"video"} onClick={() => onClickVideo(video._id)}>
                {/*<img src={video.thumbnail}/>*/}
                <img src={video.thumbnailPng}
                     onMouseEnter={(e) => {
                         e.currentTarget.src=video.thumbnailGif
                     }}
                     onMouseLeave={(e) => {
                         e.currentTarget.src=video.thumbnailPng
                     }}/>
                <div>
                    {video.title} <br/>
                    {video.author} <br/>
                    {video.views} views <br/>
                </div>
            </div>
        )
    })
    return (
        <div id={"home"}>
            <div id={"sidebar"}>

            </div>
            <div id={"allvideos"}>
                {rows}
            </div>
        </div>
    )
}