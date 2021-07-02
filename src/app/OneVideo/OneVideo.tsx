import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useHistory, useParams} from "react-router-dom";
import {getOneVideoFromApiAsync, getVideo} from "./oneVideoSlice";
import {getOneVideoFromAPI} from "./oneVideoApi";

interface idParams{
    id: string;
}
export function OneVideo(){
    const dispatch = useAppDispatch()
    const history = useHistory()
    const oneVideo = useAppSelector(getVideo)
    const params:idParams = useParams()
    useEffect(() => {
        //TODO: (SEVERE) ["data:"] Video object in initial state
        // @ts-ignore
        if (oneVideo.length === 0 || oneVideo[0] === "data:"){
            dispatch(getOneVideoFromApiAsync(params.id))
        }
    }, [])
    return (
        <div>
            {JSON.stringify(oneVideo)}
        </div>
    )
}