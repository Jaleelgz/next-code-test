"use client";

import React from "react";
// import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/slices/UserSlice";
import { toggleDrawer } from "../../store/slices/DrawerSlice";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Banner() {
  const router = useRouter();
  const dispatch = useDispatch();
  const drawerOpen = useSelector((state) => state.drawer.value);
  const user = useSelector((state) => state.user.value);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = () => {
    dispatch(toggleDrawer());
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    dispatch(clearUser());
    handleCloseUserMenu();
    router.push("/login");
  };

  return (
    // <AppBar color="white" position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box
          sx={{
            mr: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            {/* <MenuIcon /> */}
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={IMAGES.LOGO}
              style={{
                height: "40px",
                objectFit: "contain",
                display: "block",
                marginRight: "10px",
                width: "auto",
              }}
              height={40}
              alt="logo"
            />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: { xs: "12px", md: "18px" },
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Welcome
              </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile">
            <Chip
              sx={{ width: "90px", justifyContent: "left" }}
              onClick={handleOpenUserMenu}
              avatar={
                <Avatar>
                  {user?.username && user?.username[0]?.toUpperCase()}
                </Avatar>
              }
              label={user?.username}
            />
          </Tooltip>

          <Menu
            sx={{ mt: "45px", width: "200px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem sx={{ width: "200px" }} onClick={onLogout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
    // </AppBar>
  );
}
export default Banner;
