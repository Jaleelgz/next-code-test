"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment } from "@mui/material";
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ToastModes } from "@/enum/ToastModes";
import { setUser } from "@/store/slices/UserSlice";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { showToast } from "@/store/slices/ToastSlice";
import { CONSTANTS } from "@/constants/constants";

export const metadata = {
  title: "Login",
  description: "Login page",
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  const [loading, setLoading] = useState({ visibility: false, text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = /^[A-Za-z0-9]{8,12}$/;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onLoginSuccess = (loginUser) => {
    dispatch(setUser(loginUser));
    setCookie("user", JSON.stringify(loginUser));
    setLoading({ visibility: false, text: "" });

    router.push("/");
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const inputData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    if (
      inputData.username === CONSTANTS.ADMIN_USERNAME &&
      inputData.password === CONSTANTS.ADMIN_PASSWORD
    ) {
      onLoginSuccess(inputData);
      return;
    }

    if (
      inputData.username?.trim() === "" ||
      !inputData.password?.match(passwordRegex)
    ) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "Enter valid username and password",
        })
      );
      return;
    }

    setLoading({ visibility: true, text: "Login" });

    const loginUser = users.find(
      (userItem) =>
        userItem.username === inputData.username &&
        userItem.password === inputData.password
    );

    if (!loginUser) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "User not found!.Please register!",
        })
      );
      setLoading({ visibility: false, text: "" });
      return;
    }

    onLoginSuccess(loginUser);
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box component="form" noValidate onSubmit={onLogin} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          placeholder="Username"
          inputProps={{ maxLength: 30 }}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          placeholder="Password"
          inputProps={{ maxLength: 12 }}
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
