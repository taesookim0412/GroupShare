import {useHistory, useParams} from "react-router-dom"
import './SearchResults.scss'
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getSearchHistory, getSearchVideosFromApiAsync, getVideos, setVideos} from "../Videos/videosSlice";
import {getSearchVideosFromAPI} from "../Videos/videosApi";

interface QueryParams {
    query: string
}

export function SearchResults(){
    const params:QueryParams = useParams()
    const searchParams = decodeURIComponent(params.query)
    const dispatch = useAppDispatch()
    const allVideos = useAppSelector(getVideos)
    const searchHistory = useAppSelector(getSearchHistory)
    const history = useHistory()

    useEffect(() => {
        dispatch(setVideos([]))
        dispatch(getSearchVideosFromApiAsync(searchParams))
    }, searchHistory)

    function onClickVideo(id:string){
        history.push(`/watch/${id}`)
    }

    const rows = allVideos.map((video) => {
        return (
            <div className={"searchrow"} style={{padding: "20px 0px 20px 0px"}} onClick={() => onClickVideo(video._id)}>
                {/*<img src={video.thumbnail}/>*/}<img src={"https://getuikit.com/v2/docs/images/placeholder_600x400.svg"}/>
                <div className={"videoinfo"}>{video.title} <br/>
                    {video.author} <br/>
                    {video.views} <br/>

                </div>
            </div>
        )
    })
    return (
        <div className={"grid"}>
            {/*<div style={{gridColumnEnd: 2}}>*/}
            <div id={"sidebar"}>
                Sidebar
            </div>
            <div id={"searchrows"}>
                {rows}
            </div>
        </div>
    )
}