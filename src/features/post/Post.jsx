import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.jsx";

import { Card, CardContent } from "../../components/ui/card.jsx";

import { Heart, MessageCircle, Share, Volume2, VolumeX } from "lucide-react";
import { useGetPostsQuery } from "./postApi.js";
import { useRef, useState } from "react";

export default function Post() {
  const { data, isLoading, error } = useGetPostsQuery();

  const videoRefs = useRef({}); // store multiple video refs
  const [mutedStates, setMutedStates] = useState({});

  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error) return <h1 className="text-center">Error loading posts</h1>;

 const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    } 
  };

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

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="flex flex-col items-center space-y-6">

        {data?.posts?.map((post) => (
          <Card
            key={post._id}
            className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-sm bg-white max-sm:w-80 max-sm:h-auto"
          >
            {/* Header */}
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

                  {/* Mute/Unmute Button */}
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

            {/* Actions */}
            <CardContent className="p-4 space-y-2">
              <p className="text-sm">
                {post.caption}
              </p>

              <div className="flex gap-4">
                <Heart className="cursor-pointer hover:text-red-500 transition" />
                <MessageCircle className="cursor-pointer hover:text-blue-500 transition" />
                <Share className="cursor-pointer hover:text-green-500 transition" />
              </div>

              <p className="text-sm font-semibold">
                {post.likes?.length || 0} likes
              </p>
            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}