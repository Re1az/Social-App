import { useState } from "react";
import { useSearchQuery } from "./searchApi.js";
import { Avatar, AvatarImage } from "../../components/ui/avatar.jsx";
import { useNavigate } from "react-router";

export default function Search() {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useSearchQuery(query, {
    skip: !query,
  });
  console.log(data);


  const nav = useNavigate();

  return (
    <div className="p-4 max-w-xl mx-auto">

      {/* SEARCH INPUT */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="w-full p-3 border rounded-lg"
      />

      {/* RESULTS */}
      <div className="mt-4 space-y-3 p-2">

        {isLoading && <p>Loading...</p>}

        {/* ✅ FIX: only show results if query exists */}
        {query &&
          data?.users?.map((user) => (
            <div
              onClick={() => nav(`/profile/${user?._id}`)}
              key={user._id}
              className="flex items-center gap-3 p-5 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition  "
            >
              <Avatar onClick={() => nav(`/profile/${user?._id}`)} className="hover:cursor-pointer">
                <AvatarImage src={user.profilePic?.url} />
              </Avatar>

              <p onClick={() => nav(`/profile/${user?._id}`)}  className="hover:cursor-pointer hover:underline" >{user.name}</p>
              
            </div>
          ))
        }

      </div>

    </div>
  );
}