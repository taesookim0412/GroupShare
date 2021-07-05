import './Upload.scss'
import {useAppDispatch, useAppSelector} from "../hooks";
import {
    postVideo,
    selectAuthor,
    selectDescription,
    selectFilename,
    selectThumbnailGifs,
    selectThumbnailGifsIndex,
    selectThumbnailPngs,
    selectThumbnailPngsIndex,
    selectTitle,
    selectUploadState,
    selectVideo,
    setDescription,
    setFilename, setThumbnailGifs, setThumbnailPngs,
    setTitle,
    setVideo
} from "./uploadSlice";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {selectLoggedIn, selectToken} from "../LoginReg/Login/loginSlice";
import {useHistory} from "react-router-dom";
import "./Upload.scss"
import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import axios from "axios";

const ffmpeg = createFFmpeg({log: true});


export function Upload() {
    const author = useAppSelector(selectAuthor)
    const title = useAppSelector(selectTitle)
    const description = useAppSelector(selectDescription)
    const fileName = useAppSelector(selectFilename)
    const video = useAppSelector(selectVideo)
    const token = useAppSelector(selectToken)
    const thumbnailGifsIndex = useAppSelector(selectThumbnailGifsIndex)
    const thumbnailGifs = useAppSelector(selectThumbnailGifs)
    const thumbnailPngsIndex = useAppSelector(selectThumbnailPngsIndex)
    const thumbnailPngs = useAppSelector(selectThumbnailPngs)
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
        load();
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

    async function handleTestFile(file:string) {
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
        pngs[0] = ffmpeg.FS('readFile', '1.png')
        pngs[1] = ffmpeg.FS('readFile', '2.png')
        pngs[2] = ffmpeg.FS('readFile', '3.png')
        pngs[3] = ffmpeg.FS('readFile', '4.png')
        const start_strs = []
        // //4.5s - 5.5s
        for (let i = 0; i < num_gifs; i++) {
            const midpoint = duration / (num_gifs + 1) * (i + 1)
            const start_int = Math.max(0, midpoint - 0.5);
            const end_int = Math.min(duration, midpoint + 0.5)
            const start_str = start_int.toString()
            start_strs.push(start_str)
            const gif_name = `${i}.gif`
            if (start_int + 1 < duration)
                await ffmpeg.run('-i', 'video.mp4', '-t', '1', '-ss', start_str, '-f', 'gif', gif_name)
            else
                await ffmpeg.run('-i', 'video.mp4', '-t', (duration - end_int).toString(), '-ss', start_str, '-f', 'gif', gif_name)
            gifs[i] = ffmpeg.FS('readFile', gif_name)
        }
        //Multi seek method from one line (4s - 6.5s) (Slower)
        // await ffmpeg.run('-i', 'video.mp4', '-ss', start_strs[0], '-t', '1', '1.gif',
        //     '-ss', start_strs[1], '-t', '1', '2.gif',
        //     '-ss', start_strs[2], '-t', '1', '3.gif',
        //     '-ss', start_strs[3], '-t', '1', '4.gif')

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
    }

    function postRequest() {
        dispatch(postVideo({
            state: state,
            token: token,
            history: history
        }))

    }

    let videoUploadDiv = <div id={"preview--header"}>
        <div>Preview</div>
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

                    <label id={"thumbnail"}>
                        Thumbnail<br/>
                        <div id="thumbnail-box-area">
                            <div className={"thumbnail-section"}>
                                <img style={{opacity: "{}"}} src={thumbnailPngs[0]} className={"thumbnail-box"}/>
                                <img src={thumbnailPngs[1]} className={"thumbnail-box"}/>
                                <img src={thumbnailPngs[2]} className={"thumbnail-box"}/>
                                <img src={thumbnailPngs[3]} className={"thumbnail-box"}/>
                            </div>
                        </div>
                    </label>

                    <br/>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button>Upload</button>
                    </div>
                </div>
                <div id="video-right">
                    {videoUploadDiv}
                    <div className={"thumbnail-section"}>
                        <img src={thumbnailGifs[0]} className={"thumbnail-box"}/>
                        <img src={thumbnailGifs[1]} className={"thumbnail-box"}/>
                        <img src={thumbnailGifs[2]} className={"thumbnail-box"}/>
                        <img src={thumbnailGifs[3]} className={"thumbnail-box"}/>
                    </div>
                </div>
                <div id="side-spacer-right">

                </div>
            </div>

        </form>
    )
}