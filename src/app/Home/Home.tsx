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
            <div className={"video"}>
                <img src={video.thumbnailPng}
                     onMouseEnter={(e) => {
                         e.currentTarget.src=video.thumbnailGif
                     }}
                     onMouseLeave={(e) => {
                         e.currentTarget.src=video.thumbnailPng
                     }} onClick={() => onClickVideo(video._id)} />
                <div>
                    <p className={"video__title"}>{video.title.length > 25 ? `${video.title.slice(0,25)}...` : video.title}</p>
                    <p className={"video__author"}>{video.author}</p>
                    <p className={"video__views"}>{video.views} views</p>
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
