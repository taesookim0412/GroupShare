import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';
import axios from 'axios'

export interface UploadState {
    author: string,
    description: string,
    thumbnail: string,
    status: 'idle' | 'uploading' | 'successful' | 'failed'
    title: string,
    url: string,
    video: Blob
}

const initialState: UploadState = {
    author: "",
    description: "",
    thumbnail: "",
    status: 'idle',
    title: "",
    url: "",
    video: new Blob()
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount: number) => {
//         const response = await fetchCount(amount);
//         // The value we return becomes the `fulfilled` action payload
//         return response.data;
//     }
// );

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
        setThumbnail: (state, action: PayloadAction<string>) => {
            state.thumbnail = action.payload
        },
        setStatus: (state, action: PayloadAction<'idle' | 'uploading' | 'successful' | 'failed'>) => {
            state.status = action.payload
        },
        setVideo: (state, action: PayloadAction<Blob>) => {
            state.video = action.payload
        },

        // author: "",
        // description: "",
        // thumbnail: "",
        // status: 'idle',
        // title: "",
        // url: "",
        // video: ""
        postVideo: (state) => {
            const formData = new FormData()
            formData.append("author",state.author)
            formData.append("description",state.description)
            formData.append("thumbnail",state.thumbnail)
            formData.append("status",state.status)
            formData.append("title",state.title)
            formData.append("url",state.url)
            formData.append("video", state.video, "videoname")
            axios.post("/api/video", formData).then((res) => {
                //TODO: Redirect after upload completed
            })

        }
    }
})
// author: "",
//     description: "",
//     thumbnail: "",
//     status: 'idle',
//     title: "",
//     url: "",
//     video: ""
export const {
    setAuthor,
    setDescription,
    setThumbnail,
    setStatus,
    setTitle,
    setUrl,
    setVideo,
    postVideo
} = uploadSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthor = (state: RootState) => state.upload.author;
export const selectDescription = (state: RootState) => state.upload.description;
export const selectThumbnail = (state: RootState) => state.upload.thumbnail;
export const selectStatus = (state: RootState) => state.upload.status;
export const selectTitle = (state: RootState) => state.upload.title;
export const selectUrl = (state: RootState) => state.upload.url;
export const selectVideo = (state: RootState) => state.upload.video;


export default uploadSlice.reducer;
