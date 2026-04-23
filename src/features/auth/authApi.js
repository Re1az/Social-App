import { mainApi } from "../../app/mainApi.js";

 const authApi=mainApi.injectEndpoints({
  endpoints:(builder)=>({
    loginUser:builder.mutation({
      query:(q)=>({
        url:"/auth/login",
        method:"POST",
        body:q
      })
    }),
    registerUser:builder.mutation({
      query:(q)=>({
        url:"/auth/register",
        method:"POST",
        body:q
      })
    }) 
  })
 })

 export const{useLoginUserMutation,useRegisterUserMutation}=authApi