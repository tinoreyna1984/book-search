import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        show: false,
        book: {},
    },
    reducers: {
        openModal : (state, action) => {
            state.show = true;
            state.book = {...action.payload};
        },
        closeModal : (state) => {
            state.show = false;
        },
    }
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;
