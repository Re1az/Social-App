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
import { useNavigate } from "react-router";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "../../components/ui/field.jsx";

export function Register() {
  const nav = useNavigate();

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-3 py-6 max-sm:h-[calc(100vh-10px)]">

      {/* WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden">

        {/* LEFT IMAGE (hidden on mobile) */}
        <div className="hidden md:block bg-[url(./assets/register.jpg)] bg-cover bg-center" />

        {/* RIGHT FORM */}
        <Card className="w-full flex flex-col justify-center gap-4 md:gap-6 border-0 bg-gray-100">

          {/* HEADER */}
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl text-center md:text-2xl md:text-center  font-bold ">
              Create your account
            </CardTitle>

            <CardDescription className="text-sm text-center md:text-[16px] md:text-center">
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

          {/* FORM */}
          <CardContent className="overflow-y-auto">
            <form>
              <div className="flex flex-col gap-4 text-left">

                {/* NAME */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" placeholder="John Doe" className="h-10 md:h-11" />
                </div>

                {/* EMAIL */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-10 md:h-11" />
                </div>

                {/* BIO */}
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" placeholder="Life is going great" className="h-10 md:h-11" />
                </div>

                {/* FILE */}
                <Field>
                  <FieldLabel htmlFor="profilepic">Profile picture</FieldLabel>
                  <Input id="profilepic" type="file" />
                  <FieldDescription>Upload image</FieldDescription>
                </Field>

                {/* PASSWORD */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" className="h-10 md:h-11" />
                </div>

              </div>
            </form>
          </CardContent>

          {/* BUTTON */}
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full h-10 md:h-11">
              Register
            </Button>
          </CardFooter>

        </Card>
      </div>
    </div>
  );
}