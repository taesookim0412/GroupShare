import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import axios from 'axios'
import {useHistory} from "react-router-dom";
import {loginFromApi} from "../LoginReg/Login/loginApi";
import {LoginState} from "../LoginReg/Login/loginSlice";
import {b64toBlob} from "./UploadHelpers";


export interface UploadState {
    author: string,
    description: string,
    fileName: string,
    thumbnailGifsIndex: string,
    thumbnailGifs: string[],
    thumbnailPngsIndex: string,
    thumbnailPngs: string[],
    status: 'idle' | 'uploading' | 'successful' | 'failed'
    title: string,
    url: string,
    video: string
}

const initialState: UploadState = {
    author: "",
    description: "",
    fileName: "Upload",
    status: 'idle',
    thumbnailGifsIndex: "0",
    thumbnailGifs: ["","","",""],
    thumbnailPngsIndex: "",
    thumbnailPngs: ["","","",""],
    title: "",
    url: "",
    video: "",
};

interface postRequestData {
    state: UploadState,
    token: string,
    history: any
}

export const postVideo = createAsyncThunk(
    'upload/postVideo',
    async (data: postRequestData) => {
        const {state, token, history} = data
        if (state.video === "") return;
        const formData = new FormData()
        formData.append("author", localStorage.username)
        formData.append("description", state.description)
        formData.append("thumbnail", state.thumbnailGifs[state.thumbnailGifsIndex as unknown as number])
        formData.append("status", state.status)
        formData.append("title", state.title)
        formData.append("url", state.url)
        const blob = b64toBlob(state.video)
        formData.append("video", blob, state.fileName)
        axios.post("/api/video", formData, {
            headers: {
                'token': token,
                'author': localStorage.username
            }
        }).then((res) => {
            if (res.data.status === "successful") {
                // File is not uploaded synchronously
                // TODO: Query the upload until it is available..
                // history.push(`watch/${res.data.video._id}`)
                history.push(`/`)
            } else {
                history.push('/login')
            }
        })
    }
)



export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAuthor: (state, action: PayloadAction<string>) => {
            state.author = action.payload
        },
        //Add payload here
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setUrl: (state, action: PayloadAction<string>) => {
            state.url = action.payload
        },
        setFilename: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload
        },
        setThumbnailGifsIndex: (state, action: PayloadAction<string>) => {
            state.thumbnailGifsIndex = action.payload
        },
        setThumbnailGifs: (state, action: PayloadAction<string[]>) => {
            state.thumbnailGifs = action.payload
        },
        setThumbnailPngsIndex: (state, action: PayloadAction<string>) => {
            state.thumbnailPngsIndex = action.payload
        },
        setThumbnailPngs: (state, action: PayloadAction<string[]>) => {
            state.thumbnailPngs = action.payload
        },
        setStatus: (state, action: PayloadAction<'idle' | 'uploading' | 'successful' | 'failed'>) => {
            state.status = action.payload
        },
        setVideo: (state, action: PayloadAction<string>) => {
            state.video = action.payload
        },
    }
})

export const {
    setAuthor,
    setDescription,
    setFilename,
    setStatus,
    setThumbnailGifsIndex,
    setThumbnailGifs,
    setThumbnailPngsIndex,
    setThumbnailPngs,
    setTitle,
    setUrl,
    setVideo,
} = uploadSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthor = (state: RootState) => state.upload.author;
export const selectDescription = (state: RootState) => state.upload.description;
export const selectFilename = (state: RootState) => state.upload.fileName;
export const selectStatus = (state: RootState) => state.upload.status;
export const selectThumbnailGifsIndex = (state: RootState) => state.upload.thumbnailGifsIndex;
export const selectThumbnailGifs = (state: RootState) => state.upload.thumbnailGifs;
export const selectThumbnailPngsIndex = (state: RootState) => state.upload.thumbnailPngsIndex;
export const selectThumbnailPngs = (state: RootState) => state.upload.thumbnailPngs;
export const selectTitle = (state: RootState) => state.upload.title;
export const selectUploadState = (state: RootState) => state.upload;
export const selectUrl = (state: RootState) => state.upload.url;
export const selectVideo = (state: RootState) => state.upload.video;


export default uploadSlice.reducer;
