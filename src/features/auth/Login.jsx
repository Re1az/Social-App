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

export function Login() {
  const nav = useNavigate();

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-4">

      {/* WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl min-h-[70vh] md:h-[70vh] shadow-2xl rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:scale-[1.01]">

        {/* LEFT IMAGE (hidden on mobile if needed) */}
        <div
          className="hidden md:block bg-[url(./assets/last.jpg)] bg-cover bg-center"
        />

        {/* RIGHT FORM */}
        <Card className="w-full flex flex-col justify-center text-center gap-6 md:gap-10 rounded-none border-0 h-full bg-gray-100">

          {/* HEADER */}
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Login to your account
            </CardTitle>

            <CardDescription className="text-[16px]">
              Enter your email below to login
            </CardDescription>

            {/* REGISTER */}
            <div className="flex items-center justify-center gap-1 text-sm">
              <p>Don’t have an account?</p>

              <Button
                onClick={() => nav("/register")}
                variant="link"
                className="p-0"
              >
                Register here
              </Button>
            </div>
          </CardHeader>

          {/* FORM */}
          <CardContent>
            <form>
              <div className="flex flex-col gap-4">

                <div className="grid gap-2 text-left">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="h-11 hover:border-gray-500 focus:ring-2 focus:ring-black transition"
                    required
                  />
                </div>

                <div className="grid gap-2 text-left">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="h-11 hover:border-gray-500 focus:ring-2 focus:ring-black transition"
                    required
                  />
                </div>

              </div>
            </form>
          </CardContent>

          {/* BUTTON */}
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full h-11 hover:shadow-lg transition">
              Login
            </Button>
          </CardFooter>

        </Card>
      </div>
    </div>
  );
}