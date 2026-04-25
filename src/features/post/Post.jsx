import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.jsx";

import { Card, CardContent } from "../../components/ui/card.jsx";

import { Heart, MessageCircle, Share, Volume2, VolumeX } from "lucide-react";
import { useGetPostsQuery, useLikePostMutation } from "./postApi.js";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Post() {
const nav=useNavigate();
  // ✅ FIXED USER ACCESS
  const user = useSelector((state) => state.userSlice.user.user);
 

  const { data, isLoading, error } = useGetPostsQuery();
  const [likePost] = useLikePostMutation();

  const videoRefs = useRef({});
  const [mutedStates, setMutedStates] = useState({});

  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error) return <h1 className="text-center">Error loading posts</h1>;

  // ▶️ play/pause video
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

  // ❤️ like/unlike API call
  const handleLike = async (id) => {
    try {
      await likePost(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="flex flex-col items-center space-y-6">

        {data?.posts?.map((post) => {
          console.log(post.owner._id);

          // ✅ CHECK IF USER LIKED POST
          const isLiked = post.likes?.includes(user?._id);
          

          return (
            <Card
              key={post._id}
              className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-sm bg-white hover:cursor-pointer"
            >

              {/* HEADER */}
              <div className="flex items-center gap-3 p-4 hover:cursor-pointer">
                <Avatar onClick={() => nav(`/profile/${post.owner?._id}`)}>
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

              {/* ACTIONS */}
              <CardContent className="p-4 space-y-2">

                <p className="text-sm">{post.caption}</p>

                {/* LIKE + ACTIONS */}
                <div className="flex gap-4">

                  {/* ❤️ LIKE BUTTON */}
                  <div
                    onClick={() => handleLike(post._id)}
                    className={` rounded-full cursor-pointer transition ${
                      isLiked ? " text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    <Heart

                      className={isLiked ? "fill-red-500 " : "fill-white"}
                    />
                  </div>

                  <MessageCircle
                  onClick={()=>nav(`/comment/${post._id}`)}
                      className="cursor-pointer hover:text-blue-500 transition" />
                  
                </div>

                {/* LIKE COUNT */}
                <div className="flex gap-2">
                    <p className="text-sm font-semibold">
                  {post.likes?.length || 0} likes
                </p>
                <p className="text-sm font-semibold">
                  {post.comments?.length || 0} comments
                </p>
                </div>
                

              </CardContent>
            </Card>
          );
        })}

      </div>
    </div>
  );
}