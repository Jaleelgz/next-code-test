"use client";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import { useEffect } from "react";
import { setAllUsers } from "@/store/slices/UsersSlice";
import { getAllUsersFromStorage } from "@/utils/storageUtils";

const AppComponent = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast.value);

  useEffect(() => {
    dispatch(setAllUsers(getAllUsersFromStorage()));
  }, []);

  return (
    <Box>
      {toast.visibility && <Toast />}
      {children}
    </Box>
  );
};

export default AppComponent;
