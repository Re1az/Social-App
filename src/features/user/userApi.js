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
  })
})
})

export const {useGetUserQuery,useUpdateUserMutation}=userApi;