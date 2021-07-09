import './Upload.scss'
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    postVideo,
    selectAuthor,
    selectDescription,
    selectFilename, selectGifsVisiblity,
    selectStatus,
    selectThumbnailGifs,
    selectThumbnailGifsIndex,
    selectThumbnailPngs,
    selectThumbnailPngsIndex,
    selectTitle,
    selectUploadState,
    selectVideo,
    setDescription,
    setFilename,
    setGifsVisibility,
    setStatus,
    setThumbnailGifs,
    setThumbnailGifsIndex,
    setThumbnailPngs,
    setThumbnailPngsIndex,
    setTitle,
    setVideo
} from "./uploadSlice";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {selectLoggedIn, selectToken} from "../LoginReg/Login/loginSlice";
import {useHistory} from "react-router-dom";
import "./Upload.scss"
import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import axios from "axios";

const ffmpeg = createFFmpeg({log: false});


export function Upload() {
    const author = useAppSelector(selectAuthor)
    const title = useAppSelector(selectTitle)
    const description = useAppSelector(selectDescription)
    const fileName = useAppSelector(selectFilename)
    const video = useAppSelector(selectVideo)
    const token = useAppSelector(selectToken)
    const gifsVisibility = useAppSelector(selectGifsVisiblity)
    const thumbnailGifsIndex = useAppSelector(selectThumbnailGifsIndex)
    const thumbnailGifs = useAppSelector(selectThumbnailGifs)
    const thumbnailPngsIndex = useAppSelector(selectThumbnailPngsIndex)
    const thumbnailPngs = useAppSelector(selectThumbnailPngs)
    const status = useAppSelector(selectStatus)
    const state = useAppSelector(selectUploadState)

    const dispatch = useAppDispatch()
    const history = useHistory()
    const loggedIn = useAppSelector(selectLoggedIn)
    if (!loggedIn) {
        history.push("/login")
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files === null || e.target.files.length < 1) return;
        const file = e.target.files[0]
        if (!(file.type.startsWith("video"))) return;
        dispatch(setStatus("uploading"))
        const videoElement = document.createElement("video")
        videoElement.addEventListener("loadeddata", () => {
            convertToGif(file, videoElement.duration)
        })
        videoElement.src = URL.createObjectURL(new Blob([file]))
        videoElement.load()

        const fileReader = new FileReader()
        fileReader.onload = () => {
            // const videoElement = document.createElement("video")
            // videoElement.src = fileReader.result as string
            // setTimeout(() => console.log(videoElement.duration, 2), 5000 )
            dispatch(setVideo(fileReader.result as string))
            dispatch(setFilename(file.name))
        }
        fileReader.readAsDataURL(file)
    }

    useEffect(() => {
        if(loggedIn) load();
    }, [])
    const load = async () => {
        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }
        // put a video for testing
        axios.post("/test_file", {url: "https://groupsharetk.s3.us-west-1.amazonaws.com/videos/1625451065385+when+they+call+u+a+good+boi.webm"}).then((file) => {
            handleTestFile(file.data.data)
        })

    }

    async function handleTestFile(file: string) {
        dispatch(setStatus("uploading"))
        const videoElement = document.createElement("video")
        videoElement.addEventListener("loadeddata", () => {
            convertToGif(file, videoElement.duration)
        })
        videoElement.src = file
        videoElement.load()
        dispatch(setVideo(file))

        dispatch(setFilename("Test file.webm"))

    }

    //One pass for pictures, gif is either multi pass or can't find skip frames for gif fps
    const convertToGif = async (file: any, duration: number) => {
        // Write the file to memory
        ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(file));
        // Run the FFMpeg command
        const num_gifs = 4
        const gifs = new Array(num_gifs);
        const pngs = new Array(num_gifs);
        const interval = duration / (num_gifs + 1)
        const fps_str = `fps=1/${interval}`
        await ffmpeg.run('-i', 'video.mp4', '-vf', fps_str, '%d.png')
        //0

        //10.8
        pngs[0] = ffmpeg.FS('readFile', '1.png')
        //21.6
        pngs[1] = ffmpeg.FS('readFile', '2.png')
        //32.4
        pngs[2] = ffmpeg.FS('readFile', '3.png')
        //44
        pngs[3] = ffmpeg.FS('readFile', '4.png')
        //56

        // //4.5s - 5.5s
        for (let i = 0; i < num_gifs; i++) {
            const midpoint = duration / (num_gifs + 1) * (i + 1)
            const start_int = Math.max(0, midpoint - 0.5);
            const end_int = Math.min(duration, midpoint + 0.5)
            const start_str = start_int.toString()
            const gif_name = `${i}.gif`
            if (start_int + 1 < duration)
                await ffmpeg.run('-i', 'video.mp4', '-t', '1', '-ss', start_str, '-f', 'gif', gif_name)
            else
                await ffmpeg.run('-i', 'video.mp4', '-t', (duration - end_int).toString(), '-ss', start_str, '-f', 'gif', gif_name)
            gifs[i] = ffmpeg.FS('readFile', gif_name)
        }
        // TODO: Combine binary data.
        // Create a URL
        const gif_0 = URL.createObjectURL(new Blob([gifs[0].buffer], {type: 'image/gif'}));
        const gif_1 = URL.createObjectURL(new Blob([gifs[1].buffer], {type: 'image/gif'}));
        const gif_2 = URL.createObjectURL(new Blob([gifs[2].buffer], {type: 'image/gif'}));
        const gif_3 = URL.createObjectURL(new Blob([gifs[3].buffer], {type: 'image/gif'}));
        const png_0 = URL.createObjectURL(new Blob([pngs[0].buffer], {type: 'image/png'}));
        const png_1 = URL.createObjectURL(new Blob([pngs[1].buffer], {type: 'image/png'}));
        const png_2 = URL.createObjectURL(new Blob([pngs[2].buffer], {type: 'image/png'}));
        const png_3 = URL.createObjectURL(new Blob([pngs[3].buffer], {type: 'image/png'}));

        // dispatch(setThumbnailGifs([gif_0, gif_1, gif_2, gif_3]))
        dispatch(setThumbnailGifs([gif_0, gif_1, gif_2, gif_3]))
        dispatch(setThumbnailPngs([png_0, png_1, png_2, png_3]))
        dispatch(setStatus("idle"))
    }

    function postRequest() {
        dispatch(postVideo({
            state: state,
            token: token,
            history: history,
            dispatch: dispatch
        }))

    }

    let videoUploadDiv = <div id={"preview--header"}>
        <div>Preview</div>
        <div>
            <button onClick={(e) => {e.preventDefault(); dispatch(setGifsVisibility('1'))}} >Show</button>
            <button onClick={(e) => {e.preventDefault(); dispatch(setGifsVisibility('0'))}} >Hide</button>
        </div>
        <input type={"file"} accept={"video/*"} onChange={handleFile}/>
    </div>
    if (video === "") {
        videoUploadDiv = (
            <div>
                <label>
                    Video
                    <div id={"videoprev"} style={{textAlign: "end"}}>
                        {fileName}
                        <input style={{color: "black"}} accept={"video/*"} type={"file"} onChange={handleFile}/>
                    </div>
                </label><br/>
            </div>
        )
    }

    function onClickThumbnail(target: EventTarget, idx: string) {
        dispatch(setThumbnailPngsIndex(idx));


    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            postRequest()
        }}>
            <div id={"form-container"}>
                <div id="side-spacer-left">
                </div>
                <div id={"inputs"} className={"inputs"}>
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

                    <label id={"thumbnail"}>
                        Thumbnail<br/>
                        <div id="thumbnail-box-area">
                            <div className={"thumbnail-section"}>
                                <img src={thumbnailPngs[0]} className={"thumbnail-box"} onClick={() => dispatch(setThumbnailPngsIndex('0'))} style={{opacity: thumbnailPngsIndex === '0' ? '1' : '0.25'}}/>
                                <img src={thumbnailPngs[1]} className={"thumbnail-box"} onClick={() => dispatch(setThumbnailPngsIndex('1'))} style={{opacity: thumbnailPngsIndex === '1' ? '1' : '0.25'}}/>
                                <img src={thumbnailPngs[2]} className={"thumbnail-box"} onClick={() => dispatch(setThumbnailPngsIndex('2'))} style={{opacity: thumbnailPngsIndex === '2' ? '1' : '0.25'}}/>
                                <img src={thumbnailPngs[3]} className={"thumbnail-box"} onClick={() => dispatch(setThumbnailPngsIndex('3'))} style={{opacity: thumbnailPngsIndex === '3' ? '1' : '0.25'}}/>
                            </div>
                        </div>
                    </label>

                    <br/>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button>Upload</button>
                    </div>
                </div>
                <div id="video-right">
                    {/*correct*/}
                    <div id={"video-right--dialog"}
                         style={{display: status === "uploading" ? "block" : "none", opacity: "uploading" ? '1' : '0'}}>
                    {/*testing*/}
                    {/*<div id={"video-right--dialog"}*/}
                    {/*     style={{display: status === "idle" ? "block" : "none", opacity: "idle" ? 1 : 0}}>*/}
                        <h3 style={{paddingTop: "15px"}}>Loading</h3>
                        <hr/>
                        <h5>This may take several seconds.</h5>
                    </div>
                    <div id={"video-right--content"} style={{opacity: status === "idle" ? '1' : '0'}}>
                        {videoUploadDiv}
                        <div className={"thumbnail-section"} style={{opacity: gifsVisibility, pointerEvents: gifsVisibility === '0' ? 'none': 'unset'}}>
                            <img src={thumbnailGifs[0]} className={"thumbnail-box"}  onClick={() => dispatch(setThumbnailGifsIndex('0'))} style={{opacity: thumbnailGifsIndex === '0' ? '1' : status === 'idle' ? 0.25 : 0}}/>
                            <img src={thumbnailGifs[1]} className={"thumbnail-box"} onClick={() => dispatch(setThumbnailGifsIndex('1'))} style={{opacity: thumbnailGifsIndex === '1' ? '1' : status === 'idle' ? 0.25 : 0}}/>
                            <img src={thumbnailGifs[2]} className={"thumbnail-box"} onClick={() => dispatch(setThumbnailGifsIndex('2'))} style={{opacity: thumbnailGifsIndex === '2' ? '1' : status === 'idle' ? 0.25 : 0}}/>
                            <img src={thumbnailGifs[3]} className={"thumbnail-box"} onClick={() => dispatch(setThumbnailGifsIndex('3'))} style={{opacity: thumbnailGifsIndex === '3' ? '1' : status === 'idle' ? 0.25 : 0}}/>
                        </div>
                    </div>
                </div>
                <div id="side-spacer-right">

                </div>
            </div>

        </form>
    )
}
