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

import { Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useLoginUserMutation } from "./authApi.js";
import { Spinner } from "../../components/ui/spinner.jsx";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../user/userSlice.js";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(4, 'Password must be at least 4 characters').max(12,'Password must be at most 12 characters'),
});

export function Login() {
  const[loginUser,{isLoading}]=useLoginUserMutation();
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch();

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
            <Formik
             initialValues={{
                  email: "",
                  password: "",
                }}
               onSubmit={async (val) => {
  try {
    const response = await loginUser(val).unwrap();
    dispatch(setUser(response));
    console.log(response)
    toast.success("Login successful");
    nav("/");
  } catch (err) {
    console.log(err);
    toast.error(err?.data?.message || "Login failed");
  }
}}
                validationSchema={loginSchema}
            >
               


              {({values,errors,touched,handleChange,handleSubmit})=>(
                <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">

                <div className="grid gap-2 text-left">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="h-11 hover:border-gray-500 focus:ring-2 focus:ring-black transition"
                    required
                  />
                  {errors.email && touched.email && <span className="text-red-500">{errors.email}</span>} 
                </div>

                <div className="grid gap-2  text-left">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input  type={isVisible ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    id='password'
                    onChange={handleChange}
                    placeholder='Password' className='pr-9' />
        <Button
        type='button'
          variant='ghost'
          size='icon'
          onClick={() => setIsVisible(prevState => !prevState)}
          className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
        </Button>
         
            </div>
                  {errors.password && touched.password && <span className="text-red-500">{errors.password}</span>}
           </div>

              </div>
               <CardFooter className="flex flex-col gap-3">
            <Button disabled={isLoading}  onClick={handleSubmit}  type="submit" className="w-full h-11 hover:shadow-lg transition">
              {isLoading?<Spinner/>:"Login"}
            
            </Button>
          </CardFooter>
            </form>
              )}
            </Formik>



      
          </CardContent>

          {/* BUTTON */}
         

        </Card>
      </div>
    </div>
  );
}