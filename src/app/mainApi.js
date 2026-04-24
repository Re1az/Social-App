import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl='http://localhost:5000'
const mainUrl=`${baseUrl}/api`;

export const mainApi=createApi({
  reducerPath:'mainApi',
  baseQuery:fetchBaseQuery({baseUrl:mainUrl,credentials:'include'}),
  tagTypes: ["Posts"],
  endpoints:(builder)=>({}),
})