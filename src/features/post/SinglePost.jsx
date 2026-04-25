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

  // ================= STATE =================
  const [isEditing, setIsEditing] = useState(false);
  const [caption, setCaption] = useState("");

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Post not found
      </div>
    );
  }

  const isOwner = post.owner?._id === user?._id;

  // ================= DELETE =================
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

  // ================= UPDATE =================
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
    <div className="h-[calc(100vh-64px)] flex justify-center items-center p-4 relative">

      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={() => nav(-1)}
        className="absolute top-5 left-5 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white"
      >
        <ArrowLeft size={20} />
      </button>

      {/* ================= CARD ================= */}
      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between p-3 border-b">

          <div className="flex items-center gap-3">
            <img
              src={post.owner?.profilePic?.url}
              alt="user"
              className="w-9 h-9 rounded-full object-cover"
            />

            <p className="text-sm font-semibold">
              {post.owner?.name}
            </p>
          </div>

          {/* 3 DOT MENU */}
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-md hover:bg-gray-100">
                  <MoreHorizontal size={18} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                {/* EDIT */}
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditing(true);
                    setCaption(post.caption);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Post
                </DropdownMenuItem>

                {/* DELETE */}
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-500"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Post
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* ================= MEDIA ================= */}
        <div className="w-full bg-black">
          {post.type === "video" ? (
            <video
              controls
              src={post.post.url}
              className="w-full max-h-[500px] object-cover"
            />
          ) : (
            <img
              src={post.post.url}
              alt="post"
              className="w-full max-h-[500px] object-cover"
            />
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="p-3 space-y-3">

          <div className="flex gap-4">
            <Heart className="cursor-pointer hover:text-red-500" />
            <MessageCircle className="cursor-pointer hover:text-blue-500" />
          </div>

          {/* ================= CAPTION ================= */}
          {isEditing ? (
            <div className="space-y-2">
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
              />

              <div className="flex gap-2">
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
            <p className="text-sm">
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