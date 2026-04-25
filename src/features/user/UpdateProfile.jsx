import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "./userApi.js";
import { toast } from "sonner";

export default function UpdateProfile() {
  const { data, isLoading: userLoading } = useGetUserQuery();
  const user = data?.user;

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    file: null, // 🔥 renamed to match backend
  });

  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  // PREFILL
  useEffect(() => {
    if (!user) return;

    setForm({
      name: user.name || "",
      bio: user.bio || "",
      file: null,
    });

    setPreview(user.profilePic?.url || null);
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileRef.current?.click();
  };

  // IMAGE CHANGE
  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        file, // 🔥 IMPORTANT: backend expects "file"
      }));

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    if (!user) return;

    setForm({
      name: user.name || "",
      bio: user.bio || "",
      file: null,
    });

    setPreview(user.profilePic?.url || null);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) return;

    const formData = new FormData();
    formData.append("name", form.name || "");
    formData.append("bio", form.bio || "");

    // 🔥 MUST MATCH backend .single("file")
    if (form.file instanceof File) {
      formData.append("file", form.file);
    }

    try {
      await updateUser({
        id: user._id,
        formData,
      }).unwrap();

      toast.success("Profile updated");
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  if (userLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">

      <Card className="w-full max-w-lg">

        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* IMAGE */}
            <div className="flex flex-col items-center gap-3">

              <div
                onClick={handleImageClick}
                className="w-24 h-24 rounded-full overflow-hidden border cursor-pointer"
              >
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>

            {/* NAME */}
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
            />

            {/* BIO */}
            <Textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
            />

            {/* BUTTONS */}
            <div className="flex gap-3">

              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                Cancel
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

    </div>
  );
}