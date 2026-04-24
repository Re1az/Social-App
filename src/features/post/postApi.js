
import { mainApi } from "../../app/mainApi.js";

const postApi = mainApi.injectEndpoints({
 endpoints:(builder)=>({
  getPosts:builder.query({
    query:()=>({
      url:"/posts",
      method:"GET"
    }),
     providesTags: ["Posts"],
    
  }),
   getUserPosts:builder.query({
   query:(id)=>({
     url:`/posts/user/${id}`,
     method:"GET"
   })
 }),
  createPost:builder.mutation({
    query:(formdata)=>({
      url:'/posts',
      method:"POST",
      body:formdata
    }),
    invalidatesTags: ["Posts"]
  })
   
 })
 
});

export const{useGetPostsQuery,useGetUserPostsQuery,useCreatePostMutation}=postApi;