import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useHistory, useParams} from "react-router-dom";
import {getVideo, setVideo} from "./oneVideoSlice";
import {getOneVideoFromAPI} from "./oneVideoApi";
import "./OneVideo.scss"

interface idParams {
    id: string;
}

export function OneVideo() {
    const dispatch = useAppDispatch()
    const history = useHistory()
    const oneVideo = useAppSelector(getVideo)
    const params: idParams = useParams()
    useEffect(() => {
        //TODO: (SEVERE) ["data:"] Video object in initial state (dont use async thunk especially when redirecting)
        // @ts-ignore
        // if (oneVideo.length === 0 || (typeof oneVideo[0] === "string" && oneVideo[0].startsWith("data:"))){
        //     dispatch(getOneVideoFromApiAsync(params.id))
        // }
        // dispatch(getOneVideoFromApiAsync(params.id))
        getOneVideoFromAPI(params.id).then((response) => {
            dispatch(setVideo(response.data.videos[0]));

            const video = document.getElementById("video") as HTMLVideoElement;
            video.load();
            video.play();
        })

    }, [params.id])
    //Severe bug: state :video of type Video. field :video of upload (string) gets pushed into oneVideo (Video).
    //(Don't tell anyone but there is a severe bug on this page). Redux bug
    if (oneVideo.length === 0 || (typeof oneVideo[0] === "string")) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div id={"container"}>
            <div id={"onevideocontainer"}>
                <div id={"video__container"}>
                <video id={"video"} controls>
                    <source src={oneVideo[0].src} type={"video/mp4"}/>
                </video>
                </div>
                <div id={"title"}>{oneVideo[0].title}</div>
                <div id={"description"}><span
                    style={{paddingRight: "25px"}}>{oneVideo[0].views} views</span>{new Date(oneVideo[0].date).toDateString()}
                </div>
                <div>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        {oneVideo[0].likes} likes
                    </div>
                    <hr/>
                </div>
            </div>
            <div id={"sidebar"}>

            </div>


        </div>
    )
}
