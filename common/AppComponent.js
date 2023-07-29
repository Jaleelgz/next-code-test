"use client";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toast";
import { useEffect } from "react";
import { setAllUsers } from "@/store/slices/UsersSlice";
import { getAllUsersFromStorage } from "@/utils/storageUtils";
import { setUser } from "@/store/slices/UserSlice";
import { getCookie } from "cookies-next";

const AppComponent = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast.value);

  useEffect(() => {
    dispatch(setAllUsers(getAllUsersFromStorage()));

    const loggedInUser = getCookie("user");

    if (loggedInUser) {
      dispatch(setUser(JSON.parse(loggedInUser)));
    }
  }, []);

  return (
    <Box>
      {toast.visibility && <Toast />}
      {children}
    </Box>
  );
};

export default AppComponent;
