"use client";

import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../store/slices/ToastSlice";
import { ToastModes } from "../../enum/ToastModes";
import { deleteUserFromStorage } from "@/utils/storageUtils";
import { setAllUsers } from "@/store/slices/UsersSlice";
import UsersTable from "../UsersTable/UsersTable";
import Loader from "@/common/Loader";

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  const [loading, setLoading] = useState({ visibility: false, text: "" });
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [search, setSearch] = useState("");

  const searchUser = (event) => {
    if (event.target.value?.length > 15) {
      return;
    }

    setSearch(event.target.value);

    const tempFilteredList = users.filter((userItem) => {
      if (
        userItem.name
          ?.toLowerCase()
          ?.includes(event.target.value?.toLowerCase()) ||
        userItem.username
          ?.toLowerCase()
          ?.includes(event.target.value?.toLowerCase()) ||
        userItem.phone
          ?.toLowerCase()
          ?.includes(event.target.value?.toLowerCase())
      ) {
        return userItem;
      }
    });

    setFilteredUsers(tempFilteredList);
  };

  const deleteUser = async (userToDelete) => {
    if (
      window.confirm(`Do you want delete user ${userToDelete.name} ?`) === false
    ) {
      return;
    }

    setLoading({ visibility: true, text: "Deleting user" });

    const newUserList = users.filter(
      (userItem) => userItem.phone !== userToDelete.phone
    );

    deleteUserFromStorage(userToDelete);
    dispatch(setAllUsers(newUserList));
    setFilteredUsers(newUserList);

    dispatch(showToast({ mode: ToastModes.success, text: "Deleted!" }));
    setLoading({ visibility: false, text: "" });
  };

  return (
    <Box>
      {loading.visibility && <Loader />}

      <Box sx={{ maxWidth: "xl", mx: "auto", p: 3 }}>
        <Typography sx={{ fontWeight: "bold" }}>ALL USERS</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "10px",
            my: 2,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: "auto", md: "400px" },
              }}
            >
              <InputBase
                value={search}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search users"
                inputProps={{ "aria-label": "search users" }}
                onChange={searchUser}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <Search />
              </IconButton>
            </Paper>
          </Box>
        </Box>

        <UsersTable
          search={search}
          deleteUser={deleteUser}
          users={filteredUsers}
        />
      </Box>
    </Box>
  );
};

export default UsersPage;
