"use client";

import { clearToast } from "@/store/slices/ToastSlice";
import { Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "fixed",
  bottom: 50,
  left: "50%",
  transform: "translate(-50%,-0%)",
  minWidth: 200,
  zIndex: 1002,
};

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast.value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(clearToast());
    }, toast.time);

    return () => {
      clearTimeout(timeout);
    };
  }, [toast]);

  return (
    <Alert
      style={style}
      sx={{ maxWidth: { xs: "80vw", md: "50vw" }, zIndex: 1003 }}
      variant="filled"
      severity={toast.mode}
    >
      {toast.text}
    </Alert>
  );
};

export default Toast;
