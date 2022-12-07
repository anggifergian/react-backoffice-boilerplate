import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedKey: '',
        openedKeys: [],
        isLoggedIn: false,
    },
    reducers: {
        changeCurrent: (state, action) => {
            const { selectedKey, openedKeys } = action.payload;

            return {
                ...state,
                selectedKey,
                openedKeys,
            }
        },
        login: (state, action) => {
            const { status } = action.payload;
            
            return {
                ...state,
                isLoggedIn: status,
            }
        }
    }
})

export const { changeCurrent, login } = appSlice.actions;

export default appSlice.reducer;