import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    User: {
        isAuthenticated: false,
        user: null,
        currentLocation: {
            location: null,
            pincode: null
        }
    }
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        SaveUser:(state,action)=>{
           state.User.user=action.payload;
        },
        changeAuthenticationStatus: (state, action) => {
            state.User.isAuthenticated = action.payload;
        },
          changeCurrentLocation:(state,action)=>{
            state.User.currentLocation = action.payload
        }
    },
});

// export const { toggleDarkMode } = appSlice.actions;

export default appSlice.reducer;
export const { changeAuthenticationStatus,changeCurrentLocation,SaveUser } = appSlice.actions;