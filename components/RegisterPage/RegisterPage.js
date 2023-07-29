"use client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, InputAdornment } from "@mui/material";
import {
  AppRegistrationRounded,
  Call,
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ToastModes } from "@/enum/ToastModes";
import { setUser } from "@/store/slices/UserSlice";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { showToast } from "@/store/slices/ToastSlice";
import { COLORS } from "@/constants/colors";
import { setAllUsers } from "@/store/slices/UsersSlice";
import { addUserToStorage } from "@/utils/storageUtils";
import Loader from "@/common/Loader";
import { CONSTANTS } from "@/constants/constants";

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  const [loading, setLoading] = useState({ visibility: false, text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = /^[A-Za-z0-9]{8,12}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onRegisterSuccess = (newUser) => {
    dispatch(setUser(newUser));
    setCookie("user", JSON.stringify(newUser));
    setLoading({ visibility: false, text: "" });

    dispatch(showToast({ mode: ToastModes.success, text: "Registered!" }));

    router.push("/");
  };

  const onRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const inputData = {
      name: data.get("name")?.trim(),
      phone: data.get("phone")?.trim(),
      email: data.get("email")?.trim(),
      username: data.get("username")?.trim(),
      password: data.get("password")?.trim(),
    };

    for (const key of Object.keys(inputData)) {
      if (inputData[key]?.trim() === "") {
        dispatch(
          showToast({ mode: ToastModes.error, text: `${key} required!` })
        );
        return;
      }
    }

    if (
      !inputData.email?.match(emailRegex) ||
      !inputData.password?.match(passwordRegex)
    ) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "Enter valid email and password",
        })
      );
      return;
    }

    const isUserExist = users.find(
      (userItem) =>
        userItem.username === inputData.username ||
        userItem.phone === inputData.phone ||
        userItem.email === inputData.email
    );

    if (isUserExist || inputData.username === CONSTANTS.ADMIN_USERNAME) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "User already exist.Please login!",
        })
      );
      return;
    }

    let newUsers = [...users, { ...inputData }];

    addUserToStorage(inputData);
    dispatch(setAllUsers(newUsers));
    onRegisterSuccess(inputData);
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
      {loading.visibility && <Loader />}

      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <AppRegistrationRounded />
      </Avatar>

      <Typography component="h1" variant="h5">
        Register
      </Typography>

      <Box component="form" noValidate onSubmit={onRegister} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="Name"
          label="Name"
          name="name"
          autoComplete="Name"
          placeholder="Name"
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
          id="Phone"
          label="Phone"
          name="phone"
          autoComplete="Phone"
          placeholder="Phone"
          inputProps={{ maxLength: 30 }}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Call />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="Email"
          label="Email"
          name="email"
          autoComplete="Email"
          placeholder="Email"
          inputProps={{ maxLength: 30 }}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

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
          helperText={"Password should be 8 to 12 characters"}
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
          onClick={() => router.push("/login")}
          sx={{
            color: COLORS.GRAY,
            textTransform: "none",
            marginLeft: "auto",
            display: "block",
          }}
        >
          Already have an account?{" "}
          <span style={{ color: COLORS.PRIMARY, fontWeight: "bold" }}>
            Login
          </span>
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
