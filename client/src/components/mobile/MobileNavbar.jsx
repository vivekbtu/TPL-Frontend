import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNavbar() {
  let location = useLocation();

  return (
    <Box
      w="100%"
      position={"fixed"}
      bottom={"0px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px="35px"
      h="60px"
      borderTopRadius={"30px"}
      zIndex={1000}
      bg="#FFFFFF"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
    >
      <Link to={"/"}>
        <Image
          src={
            location.pathname === "/"
              ? "/assets/Dashboard-active.svg"
              : "/assets/Dashboard.svg"
          }
          alt="error"
        />
      </Link>
      <Link to={"/projects"}>
        <Image
          src={
            location.pathname === "/projects"
              ? "/assets/Project-list-active.svg"
              : "/assets/Project-list.svg"
          }
          alt="error"
        />
      </Link>
      <Link to={"/addProject"}>
        <Image
          src={
            location.pathname === "/addProject"
              ? "/assets/create-project-active.svg"
              : "/assets/create-project.svg"
          }
          alt="error"
        />
      </Link>
    </Box>
  );
}
