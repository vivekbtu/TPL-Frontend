import { Box, Button, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import { dateCoverter } from "../../utils/dateCoverter";

export default function DesktopTableRow({
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
  projectManager
}) {
  let start = dateCoverter(startDate);
  let end = dateCoverter(endDate);

  return (
    <>
      <Tr>
        <Td>
          <Box>
            <Text fontWeight={"bold"} marginBottom={"4.7px"}>{projectName}</Text>
            <Text>{`${start.month}-${start.date}, ${start.year} to ${end.month} ${end.date}, ${end.year}`}</Text>
          </Box>
        </Td>
        <Td>{reason}</Td>
        <Td>{type}</Td>
        <Td> {division}</Td>
        <Td>{category}</Td>
        <Td>{priority}</Td>
        <Td>{department}</Td>
        <Td>{location}</Td>
        <Td>{projectManager}</Td>
        <Td fontWeight={"bold"}>{status}</Td>
        <Td>
          <Button
            size={"sm"}
            colorScheme="#FFFFFF"
            bg="#025aab"
            px="15px"
            borderRadius={"15px"}
            onClick={() => updatStatus("Running", id)}
            isDisabled={status==="Running"}
          >
            Start
          </Button>
        </Td>
        <Td>
          {" "}
          <Button
            size={"sm"}
            px="15px"
            borderRadius={"15px"}
            bg="#FFFFFF"
            border={"1px solid #025aab"}
            color="#025aab"
            onClick={() => updatStatus("Closed", id)}
            isDisabled={status==="Closed"}
          >
            Close
          </Button>
        </Td>
        <Td>
          {" "}
          <Button
            size={"sm"}
            px="15px"
            borderRadius={"15px"}
            bg="#FFFFFF"
            border={"1px solid #025aab"}
            color="#025aab"
            onClick={() => updatStatus("Cancelled", id)}
            isDisabled={status==="Cancelled"}
          >
            Cancel
          </Button>
        </Td>
      </Tr>
    </>
  );
}
