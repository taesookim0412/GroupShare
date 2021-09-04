import {useAppDispatch, useAppSelector} from "../hooks";
import {getVideos, getVideosFromApiAsync, setVideos} from "../Videos/videosSlice";
import {Video, VideoDataResponse} from "../Videos/VideoInterfaces";
import {PayloadAction} from "@reduxjs/toolkit";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {setVideo} from "../OneVideo/oneVideoSlice";
import "./Home.scss"

function onClickVideo(id: string, history: any) {
    history.push(`/watch/${id}`)
}

export function Home() {
    const dispatch = useAppDispatch()
    const allVideos = useAppSelector(getVideos)
    const history = useHistory()

    useEffect(() => {
        dispatch(getVideosFromApiAsync())
        //Shows the format for videos
    }, [])



    const rows = allVideos?.map((video) => {
        return (
            <div className={"video"}>
                <div onClick={() => onClickVideo(video._id, history)}
                     onMouseEnter={(e) => {
                         (e.currentTarget.children[0] as HTMLImageElement).src=video.thumbnailGif
                }}
                     onMouseLeave={(e) => {
                         (e.currentTarget.children[0] as HTMLImageElement).src=video.thumbnailPng
                     }} >
                <img src={video.thumbnailPng}/>
                </div>
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
