import { createSlice } from "@reduxjs/toolkit";
import { clearUserFromLocalStorage, getUserFromLocalStorage, setUserToLocalStorage } from "../local/local.js";

export const userSlice=createSlice({
  name:'userSlice',
  initialState:{
    user:getUserFromLocalStorage()
  },
  reducers:{
    setUser:(state,action)=>{
      state.user=action.payload;
      setUserToLocalStorage(action.payload);
    },
    removeUser:(state)=>{
      state.user=null;
      clearUserFromLocalStorage();
    }
  }
})

export const {setUser,removeUser}=userSlice.actions
