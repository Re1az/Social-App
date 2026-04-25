import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} from "./commentApi.js";

import {
  useGetSinglePostQuery
} from "../post/postApi.js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar.jsx";
import { ArrowLeft,  EllipsisVertical, Volume2, VolumeX } from "lucide-react";

export default function Comment() {
  const nav=useNavigate();
   const videoRefs = useRef({});
    const [mutedStates, setMutedStates] = useState({});


  const { id } = useParams(); // postId

  const { data: postData, isLoading: postLoading } =
    useGetSinglePostQuery(id);

  const { data, isLoading } =
    useGetCommentsQuery(id);

  const [addComment] = useAddCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const post = postData?.post;
  const comments = data?.comments || [];

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) video.play();
    else video.pause();
  };

  // 🔇 mute/unmute video
  const toggleMute = (e, id) => {
    e.stopPropagation();

    const video = videoRefs.current[id];
    if (!video) return;

    video.muted = !video.muted;

    setMutedStates((prev) => ({
      ...prev,
      [id]: video.muted,
    }));
  };

  // ADD
 const handleAdd = async () => {
  try {
    if (!text.trim()) return;

    await addComment({
      postId: id,
      comment: text,
    }).unwrap();

    toast.success("Comment added");
    setText("");
  } catch (error) {
    console.log(error);
    toast.error("Failed to add comment");
  }
};

  // DELETE
  const handleDelete = async (commentId) => {
    await deleteComment({
      postId: id,
      commentId,
    });

    toast.success("Deleted");
  };

  // UPDATE
  const handleUpdate = async (commentId) => {
    await editComment({
      postId: id,
      commentId,
      comment: editText,
    });

    toast.success("Updated");
    setEditId(null);
    setEditText("");
  };

  if (postLoading) return <h1>Loading...</h1>;

  return (
    <div> 
      
      <div className="grid grid-cols-2 gap-10 max-w h-full">
      
      <div className="mt-10 flex justify-around">
        <div>
          <ArrowLeft className="ml-5"  onClick={()=>nav(-1)} />
        </div>

           <Card
              key={post._id}
              className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-sm bg-white"
            >

              {/* HEADER */}
              <div className="flex items-center gap-3 p-4">
                <Avatar>
                  <AvatarImage src={post.owner?.profilePic?.url} />
                  <AvatarFallback>
                    {post.owner?.name?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="font-semibold text-sm">
                  {post.owner?.name}
                </div>
              </div>

              {/* IMAGE / VIDEO */}
              {post.post?.url &&
                (post.type === "video" ? (
                  <div className="relative w-full h-125">
                    <video
                      ref={(el) => (videoRefs.current[post._id] = el)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      src={post.post?.url}
                      className="w-full h-full object-cover"
                      onClick={() => togglePlay(post._id)}
                    />

                    {/* MUTE BUTTON */}
                    <button
                      onClick={(e) => toggleMute(e, post._id)}
                      className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded text-sm"
                    >
                      {mutedStates[post._id] ? (
                        <VolumeX size={18} />
                      ) : (
                        <Volume2 size={18} />
                      )}
                    </button>
                  </div>
                ) : (
                  <img
                    src={post.post?.url}
                    className="w-full aspect-square object-cover"
                    alt="post"
                  />
                ))}
                <div className="py-4 px-5 ">
                  <p>{post.caption}</p>
                </div>
                </Card>
      </div>
      {/* POST */}
      

      {/* ADD COMMENT */}
      <div className="max-w-150 mt-20">
        <Card className="p-4 space-y-2">
        <Textarea
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Write comment"
        />
        <div className="text-end">
          <Button onClick={handleAdd}>
          Add Comment
        </Button>
        </div>
        
      </Card>
      <div className="mt-10">
        <Card className="p-4">
        <h2 className="font-semibold mb-3">
          Comments ({comments.length})
        </h2>

        <div className="max-h-[400px] overflow-y-auto space-y-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            comments.map((c) => (
              <Card
                key={c._id}
                className="p-3"
              >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                  <Avatar>
                  <AvatarImage src={post.owner?.profilePic?.url} />
                  <AvatarFallback>
                    {post.owner?.name?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="font-semibold text-sm">
                  {post.owner?.name}
                </div>
                </div>
                <div>
                   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-md hover:bg-gray-100">
          <EllipsisVertical size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setEditId(c._id);
            setEditText(c.comment);
          }}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleDelete(c._id)}
          className="text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
                </div>
                </div>
                
                

                {editId === c._id ? (
                  <>
                    <Input
                      value={editText}
                      onChange={(e) =>
                        setEditText(
                          e.target.value
                        )
                      }
                    />

                    <Button
                      onClick={() =>
                        handleUpdate(c._id)
                      }
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
  

  <div className="border-2 ">

    <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">{c.comment}</p>
    {/* RIGHT MENU */}
   

  </div>
</>
                )}
              </Card>
            ))
          )}
        </div>
      </Card>
      </div>
      </div>
      

      
    </div>

    </div>
    
  );
}