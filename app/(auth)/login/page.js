"use client";

import { useSelector } from "react-redux";

export const metadata = {
  title: "Login",
  description: "Login page",
};

const Login = () => {
  const toast = useSelector((state) => state.toast.value);

  return <div>Login</div>;
};

export default Login;
