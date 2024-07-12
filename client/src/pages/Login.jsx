import { Box, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
import DesktopLoginForm from "../components/desktop/DesktopLoginForm";
import MobileLoginForm from "../components/mobile/MobileLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginProcess } from "../redux/auth/auth.action";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let { loading, error } = useSelector((store) => store.auth);
  let dispach = useDispatch();
  let navigate = useNavigate();

  // const toast = useToast();

  let loginFunction = (details) => {
    dispach(loginProcess(details)).then((res) => {
      if (res) {
        console.log("Hello",res)
        navigate("/");
        // toast({
        //   title: res,
        //   position: 'top-center',
        //   status: "success",
        //   duration: 3000,
        //   isClosable: true,
        // });
      }
    });
  };
  return (
    <>
      {/* for desktop */}
      <Box position={"relative"}>
        <Image
          src="/assets/login-bg-1.svg"
          w="100%"
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
        />
        <DesktopLoginForm
          loginFunction={loginFunction}
          loading={loading}
          err={error}
        />
      </Box>
      {/* for mobile */}
      <Box
        display={{ base: "block", sm: "block", md: "none", lg: "none" }}
        h="90vh"
      >
        <Box w="100%" position={"relative"}>
          <Image src="/assets/login-mobbg-1.png" w="100%" h="200px" />
          <Box
            position={"absolute"}
            top={"5%"}
            left={"25%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap="5px"
            py="20px"
          >
            <Image src="/assets/Logo.svg" />
            <Text color={"#FFFFFF"}>Online Project Management</Text>
          </Box>
          <MobileLoginForm
            loginFunction={loginFunction}
            loading={loading}
            err={error}
          />
        </Box>
      </Box>
    </>
  );
}
