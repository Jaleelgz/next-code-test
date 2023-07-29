"use client";

import React, { useRef } from "react";
import { Box, Modal, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "@/store/slices/DrawerSlice";

const Drawer = ({ sidebar }) => {
  const drawerOpen = useSelector((state) => state.drawer.value);
  const dispatch = useDispatch();
  const modalRef = useRef();

  return (
    <Modal
      open={drawerOpen}
      onClose={() => dispatch(closeDrawer())}
      sx={{
        display: { xs: "block", md: "none" },
        outline: "none",
      }}
      closeAfterTransition
      ref={modalRef}
    >
      <Slide in={drawerOpen} direction="right" container={modalRef.current}>
        <Box
          onClick={() => dispatch(closeDrawer())}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "#fff",
            height: "100vh",
            overflow: "auto",
            boxShadow: 3,
            minWidth: 250,
            outline: "none",
          }}
        >
          {sidebar}
        </Box>
      </Slide>
    </Modal>
  );
};

export default Drawer;
