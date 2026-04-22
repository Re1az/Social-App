import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.jsx";

import { Card, CardContent } from "../../components/ui/card.jsx";

import { Heart, MessageCircle, Share } from "lucide-react";
import { useGetPostsQuery } from "./postApi.js";

export default function Post() {
  const { data, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error) return <h1 className="text-center">Error loading posts</h1>;

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="flex flex-col items-center space-y-6">

        {data?.posts?.map((post) => (
          <Card
            key={post._id}
            className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-sm bg-white"
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

            {/* Image */}
            <div className="w-full bg-black">
              <img
                src={post.post?.url}
                alt="post"
                className="w-full object-cover max-h-[500px]"
              />
            </div>

            {/* Actions */}
            <CardContent className="p-4 space-y-2">
              <div className="flex gap-4">
                <Heart className="cursor-pointer hover:text-red-500 transition" />
                <MessageCircle className="cursor-pointer hover:text-blue-500 transition" />
                <Share className="cursor-pointer hover:text-green-500 transition" />
              </div>

              {/* Likes */}
              <p className="text-sm font-semibold">
                {post.likes?.length || 0} likes
              </p>

              {/* Caption */}
              <p className="text-sm">
                <span className="font-semibold mr-2">
                  {post.owner?.name}
                </span>
                {post.caption}
              </p>
            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}