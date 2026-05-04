import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import {
  useDeletePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "./postApi.js";

import {
  ArrowLeft,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Pencil,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SinglePost() {
  const { id } = useParams();
  const nav = useNavigate();

  const user = useSelector((state) => state.userSlice.user.user);

  const { data, isLoading } = useGetSinglePostQuery(id);
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const post = data?.post;

  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Post not found
      </div>
    );
  }

  const isOwner = post.owner?._id === user?._id;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      await deletePost(post._id).unwrap();
      nav(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);

      await updatePost({
        postId: id,
        formData,
      }).unwrap();

      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 bg-gray-50 relative">

      {/* BACK BUTTON */}
      <button
        onClick={() => nav(-1)}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/90 backdrop-blur p-2 rounded-full shadow"
      >
        <ArrowLeft size={20} />
      </button>

      {/* CARD */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl overflow-hidden shadow-lg">

        {/* HEADER */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">

          <div className="flex items-center gap-3">
            <img
              src={post.owner?.profilePic?.url}
              alt="user"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />

            <p className="text-sm sm:text-base font-semibold">
              {post.owner?.name}
            </p>
          </div>

          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-md hover:bg-gray-100">
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditing(true);
                    setCaption(post.caption);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-500"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* MEDIA */}
        <div className="w-full bg-black">
          {post.type === "video" ? (
            <video
              controls
              src={post.post.url}
              className="w-full max-h-[60vh] object-contain sm:object-cover"
            />
          ) : (
            <img
              src={post.post.url}
              alt="post"
              className="w-full max-h-[60vh] object-contain sm:object-cover"
            />
          )}
        </div>

        {/* ACTIONS */}
        <div className="p-3 sm:p-4 space-y-3">

          <div className="flex gap-5">
            <Heart className="cursor-pointer hover:text-red-500" />
            <MessageCircle className="cursor-pointer hover:text-blue-500" />
          </div>

          {/* CAPTION */}
          {isEditing ? (
            <div className="space-y-2">
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
              />

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 bg-black text-white rounded-md text-sm"
                >
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm sm:text-base">
              <span className="font-semibold">
                {post.owner?.name}{" "}
              </span>
              {post.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}