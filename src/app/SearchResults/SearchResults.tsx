import {useHistory, useParams} from "react-router-dom"
import './SearchResults.scss'
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getSearchHistory, getSearchVideosFromApiAsync, getVideos, setVideos} from "../Videos/videosSlice";
import {getSearchVideosFromAPI} from "../Videos/videosApi";

interface QueryParams {
    query: string
}
function onClickVideo(id: string, history:any) {
    history.push(`/watch/${id}`)
}
export function SearchResults() {
    const params: QueryParams = useParams()
    const searchParams = decodeURIComponent(params.query)
    const dispatch = useAppDispatch()
    const allVideos = useAppSelector(getVideos)
    const searchHistory = useAppSelector(getSearchHistory)
    const history = useHistory()

    useEffect(() => {
        dispatch(setVideos([]))
        dispatch(getSearchVideosFromApiAsync(searchParams))
    }, searchHistory)


    const rows = allVideos.map((video) => {
        return (
            <div className={"searchrow"} style={{padding: "20px 0px 20px 0px"}} onClick={() => onClickVideo(video._id, history)}
                 onMouseEnter={(e) => {
                     (e.currentTarget.children[0].children[0] as HTMLImageElement).src = video.thumbnailGif
                 }}
                 onMouseLeave={(e) => {
                     (e.currentTarget.children[0].children[0] as HTMLImageElement).src = video.thumbnailPng
                 }}>
                <div className={"img__container"}>
                    <img src={video.thumbnailPng}/>
                </div>
                <div className={"videoinfo"}>
                    <p className={"video__title"}>{video.title.length > 50 ? `${video.title.slice(0, 25)}...` : video.title}</p>
                    <p className={"video__author"}>{video.author}</p>
                    <p className={"video__views"}>{video.views} views</p>

                </div>
            </div>
        )
    })
    return (
        <div className={"grid"}>
            {/*<div style={{gridColumnEnd: 2}}>*/}
            <div id={"sidebar"}>

            </div>
            <div id={"searchrows"}>
                {rows}
            </div>
        </div>
    )
}
