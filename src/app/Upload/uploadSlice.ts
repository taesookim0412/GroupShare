import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../app/store';


export interface UploadState {
    title: string,
    description: string,
    url: string,
    thumbnail: string,
    status: 'idle' | 'uploading' | 'successful' | 'failed'
}

const initialState: UploadState = {
    title: "",
    description: "",
    url: "",
    thumbnail: "",
    status: 'idle'
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
        }
    }
})

export const { setTitle, setDescription, setUrl, setThumbnail, setStatus } = uploadSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTitle = (state: RootState) => state.upload.title;
export const selectDescription = (state: RootState) => state.upload.description;


export default uploadSlice.reducer;
