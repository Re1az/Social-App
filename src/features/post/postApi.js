import { mainApi } from "../../app/mainApi.js";

const postApi = mainApi.injectEndpoints({
 endpoints:(builder)=>({
  getPosts:builder.query({
    query:()=>({
      url:"/posts",
      method:"GET"
    })
    
  })
   
 }) 
});

export const{useGetPostsQuery}=postApi;