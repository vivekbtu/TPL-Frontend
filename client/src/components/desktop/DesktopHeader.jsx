import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function DesktopHeader({title}) {
  return (
    <>
      <Box w="100%">
        <Image src="/assets/Header-bg.svg" w="100%" alt="error"/>
        <Box
          w="50%"          
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          position={"absolute"}
          top={"30px"}
          left={"30px"}
        >
          <Box display={"flex"} gap={"20px"}>
            <Image src="/assets/back arrow.svg" alt="error"/>
            <Text fontSize={"xl"} fontWeight={"bold"} color={"#FFFFFF"}>{title}</Text>
          </Box>
          <Box>
            <Image src="/assets/Logo.svg" alt="error"/>
          </Box>
        </Box>
      </Box>
    </>
  );
}
