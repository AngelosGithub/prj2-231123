import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

export function MainLayout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}
