import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export default function OverviewCard({ title, count, loading, error }) {
  return (
    <Box
      borderLeft={"5px solid #0cc9e8"}
      borderRadius={"5px"}
      bg="#FFFFFF"
      w="20%"
      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      pl="15px"
    >
      <Text fontSize={"xl"}>{title}</Text>
      <Text fontSize={"5xl"} fontWeight={"bold"}>
        {count}
      </Text>
      <Spinner
        size={"lg"}
        mt="10px"
        mb="10px"
        display={loading ? "block" : "none"}
      />
      <Text display={error ? "block" : "none"} color={"red"}>
        Error
      </Text>
    </Box>
  );
}
