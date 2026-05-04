import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar.jsx";
import { useFollowUnfollowMutation, useGetUserProfileQuery, useGetUserQuery } from "./userApi.js";
import { useSelector } from "react-redux";
import UserPost from "../post/UserPost.jsx";
import { useParams } from "react-router";
import { Button } from "@base-ui/react";
import { toast } from "sonner";

export default function AnyuserProfile() {
  
  const { id } = useParams();
  const { data, isLoading, error } = useGetUserProfileQuery(id);
  const { data: user } = useGetUserQuery();

  const [followUnfollow, { isLoading: followLoading }] = useFollowUnfollowMutation();

  const isFollowing = data?.user?.followers?.some(
    (f) => f.toString() === user?.user?._id?.toString()
  );

  const handleFollow = async () => {
    try {
      const res = await followUnfollow(id).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err);
    }
  };

  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error) return <h1 className="text-center">Error loading user</h1>;

  return (
    <div className="px-4 sm:px-6 md:px-10">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        
        {/* Avatar */}
        <div className="flex justify-center md:justify-end mt-10 md:mt-20">
          <Avatar className="size-32 sm:size-40 md:size-50">
            <AvatarImage src={data?.user?.profilePic?.url} />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
        </div>

        {/* User info */}
        <div className="mt-5 md:mt-30 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl font-semibold">
            {data?.user?.name}
          </h1>

          <p className="text-gray-600 mt-1">
            {data?.user?.bio}
          </p>

          <div className="flex justify-center md:justify-start space-x-5 mt-3 text-sm sm:text-base">
            <p>{data?.user?.followers?.length || 0} Followers</p>
            <p>{data?.user?.followings?.length || 0} Following</p>
          </div>

          {user?.user?._id !== data?.user?._id && (
            <div className="flex justify-center md:justify-start">
              <Button
                onClick={handleFollow}
                disabled={followLoading}
                className="bg-black text-white px-4 py-2 mt-3 rounded hover:cursor-pointer"
              >
                {followLoading
                  ? "Processing..."
                  : isFollowing
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full mt-6 md:mt-10 border-black" />

      {/* Posts */}
      <UserPost user={data?.user} />
    </div>
  );
}