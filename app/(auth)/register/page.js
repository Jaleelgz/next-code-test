"use client";

import { ToastModes } from "@/enum/ToastModes";
import { showToast } from "@/store/slices/ToastSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const metadata = {
  title: "Register",
  description: "User registration page",
};

const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      showToast({
        mode: ToastModes.success,
        text: "Toast success",
      })
    );
  }, []);

  return <div>Register</div>;
};

export default Register;
