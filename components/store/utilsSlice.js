const { createSlice } = require('@reduxjs/toolkit');

const utilsSlice = createSlice({
    name: 'auth',
    initialState:
    {
        screen: typeof window !== 'undefined' ? window.innerWidth < 600 ? "sm" : "lg" : null,
    }
    ,
    reducers: {
        changedScreen(state, action) {
            state.screen = action.payload < 600 ? "sm" : "lg"
        },

    },
});

export const { changedScreen } = utilsSlice.actions;
export default utilsSlice.reducer;
