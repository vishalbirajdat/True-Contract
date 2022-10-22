import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import utilsReducer from './utilsSlice';
import ticketsReducer from './ticketSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketsReducer, 
        utils: utilsReducer,
    },
});

export default store;
