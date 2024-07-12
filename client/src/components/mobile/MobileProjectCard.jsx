import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { dateCoverter } from "../../utils/dateCoverter";
import { RxDotFilled } from "react-icons/rx";

export default function MobileProjectCard({
  projectName,
  location,
  startDate,
  endDate,
  priority,
  reason,
  type,
  division,
  category,
  department,
  status,
  id,
  updatStatus,
}) {
  let start = dateCoverter(startDate);
  let end = dateCoverter(endDate);
  return (
    <Box
      w="95%"
      bg="#FFFFFF"
      m="auto"
      p="10px"
      mt="15px"
      borderRadius={"10px"}
      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Text fontWeight={"bold"} color={"#5c6268"}>
            {projectName}
          </Text>
          <Text>{`${start.month}-${start.date}, ${start.year} to ${end.month} ${end.date}, ${end.year}`}</Text>
        </Box>
        <Text fontWeight={"bold"} color={"#3e5d78"}>
          {status}
        </Text>
      </Box>
      <Box fontSize={"sm"} mt="10px">
        <Box display={"flex"} gap={"5px"}>
          <Text color={"#cdcdcd"}>Reason:</Text>
          <Text>{reason}</Text>
        </Box>
        <Box display={"flex"} gap={"5px"} alignItems={"center"}>
          <Text color={"#cdcdcd"}>Type:</Text>
          <Text>{type}</Text>
          <RxDotFilled color={"#cdcdcd"} />
          <Text color={"#cdcdcd"}>Category:</Text>
          <Text>{category}</Text>
        </Box>
        <Box display={"flex"} gap={"5px"} alignItems={"center"}>
          <Text color={"#cdcdcd"}>Div:</Text>
          <Text>{division}</Text>
          <RxDotFilled color={"#cdcdcd"} />
          <Text color={"#cdcdcd"}>Dept:</Text>
          <Text>{department}</Text>
        </Box>
        <Box display={"flex"} gap={"5px"}>
          <Text color={"#cdcdcd"}>Location:</Text>
          <Text>{location}</Text>
        </Box>
        <Box display={"flex"} gap={"5px"}>
          <Text color={"#cdcdcd"}>Priority:</Text>
          <Text>{priority}</Text>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} mt="10px">
        <Button
          size={"sm"}
          colorScheme="#FFFFFF"
          bg="#025aab"
          px="15px"
          borderRadius={"15px"}
          onClick={() => updatStatus("Running", id)}
          isDisabled={status === "Running"}
        >
          Start
        </Button>
        <Button
          size={"sm"}
          px="15px"
          borderRadius={"15px"}
          bg="#FFFFFF"
          border={"1px solid #025aab"}
          color="#025aab"
          onClick={() => updatStatus("Closed", id)}
          isDisabled={status === "Closed"}
        >
          Close
        </Button>
        <Button
          size={"sm"}
          px="15px"
          borderRadius={"15px"}
          bg="#FFFFFF"
          border={"1px solid #025aab"}
          color="#025aab"
          onClick={() => updatStatus("Cancelled", id)}
          isDisabled={status === "Cancelled"}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
