import './Upload.scss'
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    postVideo,
    selectAuthor,
    selectDescription, selectFilename,
    selectTitle, selectUploadState,
    selectVideo,
    setDescription, setFilename,
    setTitle,
    setVideo
} from "./uploadSlice";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {selectLoggedIn, selectToken} from "../LoginReg/Login/loginSlice";
import {useHistory} from "react-router-dom";
import "./Upload.scss"

export function Upload() {
    const author = useAppSelector(selectAuthor)
    const title = useAppSelector(selectTitle)
    const description = useAppSelector(selectDescription)
    const fileName = useAppSelector(selectFilename)
    const video = useAppSelector(selectVideo)
    const token = useAppSelector(selectToken)
    const state = useAppSelector(selectUploadState)
    const dispatch = useAppDispatch()
    const history = useHistory()
    const loggedIn = useAppSelector(selectLoggedIn)

    if (!loggedIn) {
        history.push("/login")
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null || e.target.files.length < 1) return;
        const file = e.target.files[0]
        if (file.type != "video/mp4") return;
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            dispatch(setVideo(fileReader.result as string))
            dispatch(setFilename(file.name))
        }
    }

    function postRequest() {
        dispatch(postVideo({
            state: state,
            token: token,
            history: history
        }))

    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            postRequest()
        }}>
            <div id={"form-container"}>
                <div id="side-spacer-left">
                </div>
                <div id={"inputs"}>
                    <label id={"title"}>
                        Title<br/>
                        <textarea value={title} onChange={(e) => {
                            e.preventDefault();
                            dispatch(setTitle(e.target.value))
                        }}/>
                    </label><br/>
                    <br/>

                    <label>
                        Description<br/>
                        <textarea value={description} onChange={(e) => {
                            e.preventDefault();
                            dispatch(setDescription(e.target.value))
                        }} style={{height: "120px"}}/><br/>
                    </label><br/>

                    {/*<label id={"thumbnail"}>*/}
                    {/*    Thumbnail<br/>*/}
                    {/*    <div id="thumbnail-box-area">*/}
                    {/*        <div className={"thumbnail-box"}>*/}
                    {/*            Upload Thumbnail*/}
                    {/*        </div>*/}
                    {/*        <div className={"thumbnail-box"}>*/}
                    {/*        </div>*/}
                    {/*        <div className={"thumbnail-box"}>*/}
                    {/*        </div>*/}
                    {/*        <div className={"thumbnail-box"}>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</label>*/}
                    <br/>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button>Upload</button>
                    </div>
                </div>
                <div id="video-right">
                    <label>
                        Video
                        <div id={"videoprev"} style={{textAlign: "end"}}>
                            {fileName}
                            {/*<input accept={"video/mp4"} type={"file"} onChange={handleFile}/>*/}
                            <input style={{color: "black"}} accept={"video/mp4"} type={"file"} onChange={handleFile}/>
                        </div>
                    </label><br/>
                </div>
                <div id="side-spacer-right">

                </div>
            </div>

        </form>
    )
}