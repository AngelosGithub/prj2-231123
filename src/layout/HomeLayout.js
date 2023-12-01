import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../component/Navbar";

function HomeLayout(props) {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default HomeLayout;
