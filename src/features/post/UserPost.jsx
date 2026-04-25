import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserPostsQuery } from "./postApi";

export default function UserPost({ user }) {
  const nav = useNavigate();

  const { data, isLoading } = useGetUserPostsQuery(user?._id, {
    skip: !user?._id,
  });
  

  const posts = data?.posts;
  const videoRefs = useRef({});
  const [mutedStates, setMutedStates] = useState({});

  if (!user) return <p className="text-center">Loading user...</p>;
  if (isLoading) return <p className="text-center">Loading posts...</p>;

  const openPost = (id) => {
    nav(`/post/${id}`);
  };

  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) video.play();
    else video.pause();
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
    <div className="grid grid-cols-3 gap-1 mt-5 p-10">

      {posts?.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            onClick={() => openPost(post._id)}
            className="cursor-pointer relative shadow-2xl hover:scale-[1.01] transition"
          >

            {post.post?.url ? (
              post.type === "video" ? (
                <video
                  ref={(el) => (videoRefs.current[post._id] = el)}
                  muted
                  loop
                  playsInline
                  src={post.post.url}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <img
                  src={post.post.url}
                  className="w-full aspect-square object-cover"
                  alt="post"
                />
              )
            ) : (
              <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                No Media
              </div>
            )}

          </div>
        ))
      ) : (
        <p className="text-center col-span-3">No posts yet</p>
      )}

    </div>
  );
}