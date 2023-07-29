"use client";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { StyledSideBar } from "./StyledSideBar";
import { Home, Group } from "@mui/icons-material";
import { useSelector } from "react-redux";
import React from "react";
import { CONSTANTS } from "@/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const user = useSelector((state) => state.user.value);

  return (
    <StyledSideBar>
      <List>
        <Tooltip placement="right" title="Home">
          <Link
            className={pathname == "/" ? "normalLink active" : "normalLink"}
            href={"/"}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  primary="Home"
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </Tooltip>

        {user?.username === CONSTANTS.ADMIN_USERNAME &&
          user?.password === CONSTANTS.ADMIN_PASSWORD && (
            <Tooltip placement="right" title="User management">
              <Link
                className={
                  pathname == "/users" ? "normalLink active" : "normalLink"
                }
                href={`/users`}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Group />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Tooltip>
          )}
      </List>
    </StyledSideBar>
  );
};

export default SideBar;
