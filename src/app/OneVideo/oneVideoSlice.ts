import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import axios, {AxiosResponse} from 'axios'
import {VideoDataResponse} from "./../Videos/VideoInterfaces";
import {Video} from "./../Videos/VideoInterfaces";
import {getOneVideoFromAPI} from "./oneVideoApi";

//Even though it's one video we use an array in order to initialize it instead of an empty dictionary
//and to reuse the video data response interface from the API
export interface OneVideoState {
    status: string,
    video: Video[]
}

const initialState: OneVideoState = {
    status: "",
    video: []
};
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

//this is really bad for reusable components, the state can change while switching views.
// export const getOneVideoFromApiAsync = createAsyncThunk(
//     'oneVideo/getOneVideoFromApi',
//     async (id:string) => {
//         const response = await getOneVideoFromAPI(id);
//         // // The value we return becomes the `fulfilled` action payload
//         return response.data;
//     }
// );

export const oneVideoSlice = createSlice({
    name: 'upload',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setVideo: (state, video: PayloadAction<Video>) => {
            state.video[0] = video.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getOneVideoFromApiAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(getOneVideoFromApiAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             state.video = action.payload.videos;
    //         })
    // },

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
    setVideo
} = oneVideoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getVideo = (state: RootState) => state.oneVideo.video;


export default oneVideoSlice.reducer;
