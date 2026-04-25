import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../user/userSlice.js";
import { useLogoutUserMutation } from "./authApi.js";
import { LogOutIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog.jsx";

import { Button } from "../../components/ui/button.jsx";
import { toast } from "sonner";

export default function Logout() {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(removeUser());
      toast.success("Logged out successfully");
      nav("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
      <AlertDialog className="">
        <AlertDialogTrigger asChild>
          <Button  className="flex items-center justify-start p-5 bg-transparent text-red-500 hover:bg-red-300" >
            <LogOutIcon />
            Logout
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? "Logging out..." : "Yes"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    
  );
}