import useWindowDimensions from '../utils/useWindowDimensions';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const utilsSlice = createSlice({
    name: 'auth',
    initialState:
    {
        screen: null,
    }
    ,
    reducers: {
        changedScreen(state, action) {
            state.screen = action.payload < 600 ? "sm" : "lg"
        },

    },

    extraReducers: (builder) => {
        builder

           
            .addCase(fetchScreen.fulfilled, (state, action) => {
                state.screen = action.payload
            })
           
    },
});

export const { changedScreen } = utilsSlice.actions;
export default utilsSlice.reducer;

// // Thunks
export const fetchScreen = createAsyncThunk('all/fetchScreen', async () => {
    const data = await useWindowDimensions();
    return data;
});

