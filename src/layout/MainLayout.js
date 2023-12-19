import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import { SearchComponent } from "../component/SearchComponent";
import React from "react";

export function MainLayout() {
  return (
    <Box>
      <Navbar />

      <Outlet />
    </Box>
  );
}
