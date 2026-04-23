import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi.js";
import { userSlice } from "../features/user/userSlice.js";

export const store=configureStore({
  reducer:{
    [mainApi.reducerPath]:mainApi.reducer,
    [userSlice.name]:userSlice.reducer
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(mainApi.middleware)
  }
})