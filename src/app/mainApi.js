import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl='http://192.168.1.67:5000'
const mainUrl=`${baseUrl}/api`;

export const mainApi=createApi({
  reducerPath:'mainApi',
  baseQuery:fetchBaseQuery({baseUrl:mainUrl}),
  endpoints:(builder)=>({}),
})