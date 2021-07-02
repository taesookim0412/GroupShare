import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import axios from 'axios'
import {useHistory} from "react-router-dom";
import {loginFromApi} from "../LoginReg/Login/loginApi";
import {LoginState} from "../LoginReg/Login/loginSlice";


export interface UploadState {
    author: string,
    description: string,
    fileName: string,
    forward: string,
    thumbnail: string,
    status: 'idle' | 'uploading' | 'successful' | 'failed'
    title: string,
    url: string,
    video: string
}

const initialState: UploadState = {
    author: "",
    description: "",
    fileName: "",
    forward: "",
    status: 'idle',
    thumbnail: "",
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
        formData.append("thumbnail", state.thumbnail)
        formData.append("status", state.status)
        formData.append("title", state.title)
        formData.append("url", state.url)
        const video = new Blob([state.video])
        formData.append("video", video, state.fileName)
        axios.post("/api/video", formData, {
            headers: {
                'token': token,
                'author': localStorage.username
            }
        }).then((res) => {
            if (res.data.status === "successful") {
                history.push(`watch/${res.data.video._id}`)
            }
        })
    })
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
        setThumbnail: (state, action: PayloadAction<string>) => {
            state.thumbnail = action.payload
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
    setThumbnail,
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
export const selectThumbnail = (state: RootState) => state.upload.thumbnail;
export const selectTitle = (state: RootState) => state.upload.title;
export const selectUploadState = (state: RootState) => state.upload;
export const selectUrl = (state: RootState) => state.upload.url;
export const selectVideo = (state: RootState) => state.upload.video;


export default uploadSlice.reducer;
