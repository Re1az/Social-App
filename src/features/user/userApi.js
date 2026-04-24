import { mainApi } from "../../app/mainApi.js"

const userApi=mainApi.injectEndpoints({
  endpoints:(builder)=>({
    getUser:builder.query({
      query:()=>({
        url:"/users/me",
        method:"GET"
       
      })
    })
  })
})

export const {useGetUserQuery}=userApi;