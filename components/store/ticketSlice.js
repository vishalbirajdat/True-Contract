import { getAllTicketsData } from '../contract/contract/getFunctions';

import { STATUSES, TOASTS } from '../utils/constants';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');



const ticketSlice = createSlice({
    name: 'nfts',
    initialState: {
        AllTICKETS : {
            AllTICKETS: [],
            status: STATUSES.LOADING,
        },
        totalReward : 0,
        myReward : "0",
        timeStamper:null,
       
    },

    
    reducers: {

       addMyReward(state, action) {
            state.myReward = action.payload;
        },

   
       addTimeStamper(state, action) {
           state.timeStamper = action.payload;
        },

   
    },
    extraReducers: (builder) => {
        builder

        // all NFTS
            .addCase(fetchAll.pending, (state, action) => {
                state.AllTICKETS.status = STATUSES.LOADING;
            })
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.AllTICKETS.AllTICKETS = action.payload;
                state.AllTICKETS.status = STATUSES.IDLE;
                const checkSenderData = action.payload.filter(e => e.receiver.toString() != "0x0000000000000000000000000000000000000000");
                state.totalReward = checkSenderData.length ? 10000 * checkSenderData.length : 0;

            })
            .addCase(fetchAll.rejected, (state, action) => {
                state.AllTICKETS.status = STATUSES.ERROR;
        });
    },
});

export const { addMyReward, addTimeStamper } = ticketSlice.actions;
export default ticketSlice.reducer;

// // Thunks
export const fetchAll = createAsyncThunk('all/fetch', async () => {
    const data = await getAllTicketsData();
    return data;
});



