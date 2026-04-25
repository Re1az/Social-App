import { mainApi } from "../../app/mainApi.js";

export const commentApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    getComments: builder.query({
      query: (postId) => ({
        url: `posts/comment/${postId}`,
        credentials: "include",
      }),
      providesTags: (result, error, postId) => [
        { type: "Comments", id: postId }
      ],
    }),

    addComment: builder.mutation({
      query: ({ postId, comment }) => ({
        url: `posts/comment/${postId}`,
        method: "POST",
        body: { comment },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId }
      ],
    }),

    editComment: builder.mutation({
      query: ({ postId, commentId, comment }) => ({
        url: `posts/comment/${postId}`,
        method: "PUT",
        body: { commentId, comment },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId }
      ],
    }),

    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `posts/comment/${postId}`,
        method: "DELETE",
        body: { commentId },
        credentials: "include",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId }
      ],
    }),

  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = commentApi;