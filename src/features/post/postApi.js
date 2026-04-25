
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
 
 getSinglePost:builder.query({
   query:(id)=>({
     url:`/posts/${id}`,
     method:"GET"
   }),
    providesTags: (result, error, id) => [
    { type: "Posts", id }
  ]
 }),
  createPost:builder.mutation({
    query:(formdata)=>({
      url:'/posts',
      method:"POST",
      body:formdata
    }),
    invalidatesTags: ["Posts"]
  }),
  deletePost: builder.mutation({
  query: (postId) => ({
    url: `/posts/${postId}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Posts"],
}),
updatePost: builder.mutation({
  query: ({ postId, formData }) => ({
    url: `/posts/${postId}`,
    method: "PUT",
    body: formData,
  }),
  invalidatesTags: (result, error, { postId }) => [
    { type: "Posts" },
    { type: "Posts", id: postId }
  ],
}),
  likePost: builder.mutation({
  query: (id) => ({
    url: `/posts/like/${id}`,
    method: "POST",
  }),
  invalidatesTags: ["Posts"],
}),
   
 })
 
});

export const{useGetPostsQuery,useGetUserPostsQuery,useCreatePostMutation,useLikePostMutation,useGetSinglePostQuery,useDeletePostMutation,useUpdatePostMutation}=postApi;