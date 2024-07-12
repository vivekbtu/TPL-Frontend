import { Box, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { logoutProcess } from "../../redux/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MobileHeader({ title }) {
  let { isAuth } = useSelector((store) => store.auth);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // const toast = useToast();

// logout handler
  let handleLogout = () => {
    dispatch(logoutProcess())
    navigate("/login");
    localStorage.removeItem("token");

    // if(isAuth){
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
    <Box w="100%" position={"sticky"} top={"0px"} zIndex={1000}>
      <Image src="/assets/Header-bg.svg" w="100%" alt="error"/>
      <Box
        w="90%"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"absolute"}
        top={"5px"}
        left={"20px"}       
      >
        <Box display={"flex"} gap={"20px"}>
          <Image src="/assets/back arrow.svg" alt="error"/>
          <Text fontSize={"xl"} fontWeight={"bold"} color={"#FFFFFF"}>
            {title}
          </Text>
        </Box>
        <Box>
          <Image src="/assets/Logout.svg" cursor={"pointer"} onClick={handleLogout} alt="error"/>
        </Box>
      </Box>
    </Box>
  );
}
