"use client";

import { useSelector } from "react-redux";
import { Slide, Box } from "@mui/material";
import { CONSTANTS } from "../../constants/constants";
import { StyledHomeLayout } from "./StyledHomeLayout";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import SideBar from "../SideBar/SideBar";
import Banner from "../Banner/Banner";
import Drawer from "@/common/Drawer";

const HomeLayout = ({ children }) => {
  const drawerOpen = useSelector((state) => state.drawer.value);

  const { width } = useWindowDimensions();

  return (
    <StyledHomeLayout>
      <Box className="navBarParent" style={{ zIndex: 10 }}>
        <Banner />
      </Box>

      <Box
        sx={{ minHeight: { xs: `calc(100vh - ${CONSTANTS.HEADER_HEIGHT}px)` } }}
        className="layoutBody"
      >
        {width < 900 && drawerOpen && <Drawer sidebar={<SideBar />} />}

        <Slide direction="right" in={drawerOpen}>
          <Box
            sx={{
              display: {
                xs: "none",
                md: drawerOpen ? "block" : "none",
                boxShadow: 3,
                zIndex: 5,
              },
            }}
            className="leftSideParent"
          >
            <SideBar />
          </Box>
        </Slide>

        <Box className="rightSideParent" id="rightSideParent">
          {children}
        </Box>
      </Box>
    </StyledHomeLayout>
  );
};

export default HomeLayout;
