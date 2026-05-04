import { mainApi } from "../../app/mainApi.js";

export const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (key) => ({
        url: `/users/search/${key}`, 
        method: "GET",              
      }),
    }),
  }),
});
export const { useSearchQuery } = searchApi;