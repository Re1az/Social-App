import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar.jsx";
import { useGetUserQuery } from "./userApi.js";
import { useSelector } from "react-redux";
import UserPost from "../post/UserPost.jsx";

export default function UserProfile() {
  const {data,isLoading,error}=useGetUserQuery();
  // const{user}=useSelector((state)=>state.userSlice);
  // console.log(user);
  console.log(data);

  if(isLoading) return <h1 className="text-center">Loading...</h1>;
  if(error) return <h1 className="text-center">Error loading user</h1>;


  return (
    <div>
  {/* Top section */}
  <div className="grid grid-cols-2 gap-10">
    <div className="justify-self-end mt-20">
      <Avatar className="size-50">
        <AvatarImage src={data?.user?.profilePic?.url} />
        <AvatarFallback>Profile</AvatarFallback>
      </Avatar>
    </div>

    <div className="mt-30">
      <h1>{data?.user?.name}</h1>
      <p>{data?.user?.bio}</p>

      <div className="flex space-x-5 mt-2">
        <p>{data?.user?.followers?.length || 0} Followers</p>
        <p>{data?.user?.followings?.length || 0} Following</p>
      </div>
    </div>
  </div>

  {/* Divider */}
  <hr className="w-full mt-10 border-black" />

  {/* Posts */}
  <UserPost user={data?.user} />
</div>
    
  )
}