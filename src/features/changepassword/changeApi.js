import { mainApi } from "../../app/mainApi.js";

export const changePasswordApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    changePassword: builder.mutation({
      query: ({ id, oldPassword, newPassword }) => ({
        url: `/users/changepassword`,
        method: "POST",
        body: { oldPassword, newPassword },
      }),
    }),

  }),
});

export const { useChangePasswordMutation } = changePasswordApi;