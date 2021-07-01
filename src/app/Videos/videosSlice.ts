import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import axios, {AxiosResponse} from 'axios'
import {VideoDataResponse} from "./VideoInterfaces";
import {Video} from "./VideoInterfaces";
import {getVideosFromAPI} from "./videosApi";

export interface VideosState {
    status: string,
    videos: Video[]
}

const initialState: VideosState = {
    status: "",
    videos: []
};
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getVideosFromApiAsync = createAsyncThunk(
    'videos/getVideosFromApi',
    async () => {
        const response = await getVideosFromAPI();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);
export const getOneVideoFromApiAsync = createAsyncThunk(
    'video/getOneVideoFromApi',
    async () => {
        const response = await getVideosFromAPI();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
)


export const videosSlice = createSlice({
    name: 'upload',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setVideos: (state, videos: PayloadAction<Video[]>) => {
            state.videos = videos.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideosFromApiAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getVideosFromApiAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.videos = action.payload.videos;
            })
    },

    // author: "",
    // description: "",
    // thumbnail: "",
    // status: 'idle',
    // title: "",
    // url: "",
    // video: ""
    // getVideosReq: (state) => {
    //     axios.get("/api/video/all").then((data:AxiosResponse<VideoDataResponse>) => {
    //         state.videos = data.data.videos
    //         console.log(data)
    //     })
    // }
})
// author: "",
//     description: "",
//     thumbnail: "",
//     status: 'idle',
//     title: "",
//     url: "",
//     video: ""
export const {
    setVideos
} = videosSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getVideos = (state: RootState) => state.videos.videos;


export default videosSlice.reducer;
