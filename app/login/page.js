"use client";

import { useSelector } from "react-redux";

const Login = () => {
  const toast = useSelector((state) => state.toast.value);

  return <div>Login</div>;
};

export default Login;
