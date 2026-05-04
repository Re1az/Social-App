import { mainApi } from "../../app/mainApi.js"

const userApi=mainApi.injectEndpoints({
  endpoints:(builder)=>({
    getUser:builder.query({
      query:()=>({
        url:"/users/me",
        method:"GET"
       
      }),
      providesTags: ["User"],
    }),
    updateUser:builder.mutation({
      query:({id,formData})=>({
        url:`/users/${id}`,
        method:"PUT",
        body:formData,


      }),
      invalidatesTags: ["User"],
  }),
  getUserProfile:builder.query({
    query:(id)=>({
      url:`/users/${id}`,
      method:"GET"
    }),
    providesTags: ["User"],
  }),
  followUnfollow:builder.mutation({
    query:(id)=>({
      url:`/users/follow/${id}`,
      method:"POST"
    }),
    invalidatesTags: ["User"],
  }),
})
})

export const {useGetUserQuery,useUpdateUserMutation,useGetUserProfileQuery,useFollowUnfollowMutation}=userApi;