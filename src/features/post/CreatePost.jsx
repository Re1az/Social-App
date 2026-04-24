import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useCreatePostMutation } from "./postApi.js";
import { toast } from "sonner";

const createPostSchema = Yup.object().shape({
  caption: Yup.string().max(30, "Maximum 30 characters"),
  file: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "Unsupported file type",
      (value) =>
        value &&
        [
          "image/png",
          "image/jpeg",
          "image/webp",
          "image/gif",
          "image/jpg",
          "video/mp4",
          "video/webm",
        ].includes(value.type)
    ),
});

export default function CreatePost() {
  const nav = useNavigate();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [errors, setErrors] = useState({});
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      setErrors({});

      await createPostSchema.validate(
        { caption, file },
        { abortEarly: false }
      );

      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("file", file);

      await createPost(formData).unwrap();
      toast.success("Post created successfully");

      nav(-1);
    } catch (err) {
      toast.error("Error creating post");
      const formattedErrors = {};

      if (err.inner) {
        err.inner.forEach((e) => {
          formattedErrors[e.path] = e.message;
        });
      }

      setErrors(formattedErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <Card className="w-full max-w-xl">

        {/* Header */}
        <CardHeader>
          <CardTitle>Create a new post</CardTitle>
          <p className="text-sm text-muted-foreground">
            Drag and drop files to upload your post
          </p>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* FILE UPLOAD */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted transition"
          >
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <label htmlFor="file" className="cursor-pointer block space-y-2">
              <p className="font-medium">
                Drag & Drop or Click to upload
              </p>

              <p className="text-xs text-muted-foreground">
                Images & Videos supported
              </p>

              {/* ✅ FILE PREVIEW WITH REMOVE BUTTON */}
              {file && (
                <div className="mt-3 relative">

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                    }}
                    className="absolute top-2 right-2 bg-black/70 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"
                  >
                    ✕
                  </button>

                  {/* IMAGE */}
                  {file.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-100 object-cover rounded-lg"
                    />
                  ) : file.type.startsWith("video") ? (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-100 object-cover rounded-lg"
                      controls
                    />
                  ) : (
                    <p className="text-sm text-green-600">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
              )}

              {errors.file && (
                <p className="text-sm text-red-500">{errors.file}</p>
              )}
            </label>
          </div>

          {/* BIO */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Caption</label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write something about your post..."
            />
            {errors.caption && (
              <p className="text-sm text-red-500">{errors.caption}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <Button onClick={() => nav(-1)} variant="outline">
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}