import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, useNavigate } from "react-router";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../components/ui/field.jsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useRegisterUserMutation } from "./authApi.js";
import { Spinner } from "../../components/ui/spinner.jsx";
import { toast } from "sonner";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("UserName is required")
    .max(25, "Username must be at most 15 characters"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(12, "Password must be at most 12 characters"),

  profilePic: Yup.mixed()
    .required("Profile picture is required")
    .test("fileType", "Invalid file type", (value) => {
      return (
        value &&
        ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          value.type
        )
      );
    }),
});

export function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const nav = useNavigate();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-3 py-6 max-sm:h-[calc(100vh-10px)]">

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="hidden md:block bg-[url(./assets/register.jpg)] bg-cover bg-center" />

        {/* RIGHT FORM */}
        <Card className="w-full flex flex-col justify-center gap-4 md:gap-6 border-0 bg-gray-100">

          <CardHeader className="space-y-2">
            <CardTitle className="text-xl text-center md:text-2xl font-bold">
              Create your account
            </CardTitle>

            <CardDescription className="text-sm text-center md:text-[16px]">
              Enter your details to register
            </CardDescription>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-sm">
              <p>Already have an account?</p>

              <Button
                onClick={() => nav("/login")}
                variant="link"
                className="p-0 h-auto"
              >
                Login
              </Button>
            </div>
          </CardHeader>

          <CardContent className="overflow-y-auto">

            <Formik
              initialValues={{
                name: "",
                email: "",
                bio: "",
                profilePic: "",
                password: "",
              }}
              validationSchema={registerSchema}
             onSubmit={async (val) => {
  const formData = new FormData();

  formData.append("name", val.name);
  formData.append("email", val.email);
  formData.append("bio", val.bio);
  formData.append("password", val.password);
  formData.append("file", val.profilePic);

  try {
    await registerUser(formData).unwrap();

    toast.success("Registered successfully");
    nav("/login");

  } catch (err) {
    console.log(err);
    toast.error(err?.data?.message || "Something went wrong");
  }
}}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>

                  <div className="flex flex-col gap-4 text-left">

                    {/* NAME */}
                    <div className="grid gap-2">
                      <Label>Username</Label>
                      <Input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      {errors.name && touched.name && (
                        <p className="text-red-500 text-xs">{errors.name}</p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>

                    {/* BIO */}
                    <div className="grid gap-2">
                      <Label>Bio</Label>
                      <Input
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                        placeholder="Life is going great"
                      />
                    </div>

                    {/* FILE */}
                    <Field>
                      <FieldLabel>Profile picture</FieldLabel>

                      <Input
                        type="file"
                        onChange={(e) =>
                          setFieldValue("profilePic", e.currentTarget.files[0])
                        }
                      />

                      <FieldDescription>Upload image</FieldDescription>

                      {errors.profilePic && touched.profilePic && (
                        <p className="text-red-500 text-xs">
                          {errors.profilePic}
                        </p>
                      )}
                    </Field>

                    {/* PASSWORD */}
                    <div className="grid gap-2">
                      <Label>Password</Label>

                      <div className="relative">
                        <Input
                          type={isVisible ? "text" : "password"}
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className="pr-9"
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsVisible((p) => !p)}
                          className="absolute right-0 inset-y-0"
                        >
                          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                        </Button>
                      </div>

                      {errors.password && touched.password && (
                        <p className="text-red-500 text-xs">
                          {errors.password}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* SUBMIT */}
                  <CardFooter className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      {isLoading ? <Spinner /> : "Register"}
                    </Button>
                  </CardFooter>

                </form>
              )}
            </Formik>
          </CardContent>

        </Card>
      </div>
    </div>
  );
}