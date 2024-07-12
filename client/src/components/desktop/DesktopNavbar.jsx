import { Box, Divider, Image, useToast } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutProcess } from "../../redux/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";

export default function DesktopNavbar() {
  let location = useLocation();
  let { isAuth } = useSelector((store) => store.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // const toast = useToast();

  // handeling logout
  let handleLogout = () => {
    dispatch(logoutProcess())
    localStorage.removeItem("token");
    navigate("/login");

    // if(!isAuth){
    //   toast({
    //     title: "Logout Succesfully !",
    //     position: 'top-center',
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
    
  };
  return (
    <>
      <Box
        h="90vh"
        w="5%"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        py={"20px"}
        bg="#FFFFFF"
      >
        <Box
          width={"50%"}
          h="47%"
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"30px"}
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
          <Divider w="100%" />
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
        <Box
          width={"80%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          marginBottom={"20px"}
        >
          <Link to={"/login"} onClick={handleLogout}>
            <Image src="/assets/Logout.svg" alt="error"/>
          </Link>
        </Box>
      </Box>
    </>
  );
}
