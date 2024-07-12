import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
// import { GrFormNext } from "react-icons/gr";
// import { GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { getProj, updateProj } from "../../redux/project/project.action";
import DesktopTableRow from "./DesktopTableRow";
import { Pagination } from "./Pagination"; // Import Pagination component

export default function DesktopProjectListing() {
  let { projects, loading, error, total } = useSelector(
    (store) => store.projects
  );
  let { data } = useSelector((store) => store.auth);
  let dispatch = useDispatch();
  let [curr, setCurr] = useState(1);
  let [search, setSearch] = useState("");
  let [sort, setSort] = useState("");
  let [show, setShow] = useState(true);

  let totalPages = Math.ceil(total / 10);
  console.log("TotalPages", totalPages)

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurr(page);
  };

  // Function to fetch projects based on search, sort, and page
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(getProj(data, search, sort, curr));
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [search, sort, curr]);

  // Function to update project status
  let updateStatus = (val, id) => {
    updateProj(data.token, { status: val }, id)
      .then((res) => {
        if (res) {
          dispatch(getProj(data, search, sort, curr));
        } else {
          alert("Error while updating status");
        }
      })
      .catch((err) => {
        alert("Error while updating status");
      });
  };

  // Handlers for search and sort
  let handleChange = (e) => {
    setSearch(e.target.value);
    if (search.length !== 0) {
      setShow(false);
    }
  };

  let handleReset = () => {
    setSearch("");
    setShow(true);
  };

  let handleSort = (e) => {
    setSort(e.target.value);
  };

  // Handlers for pagination
  let nextPage = () => {
    setCurr((prev) => prev + 1);
  };

  let prevPage = () => {
    setCurr((prev) => prev - 1);
  };

  return (
    <>
      <Box
        w={"95%"}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        h="88vh"
        px="20px"
        py="20px"
        bg="#FFFFFF"
        borderRadius={"10px"}
        position="absolute"
        top={"130px"}
        left="40px"
      >
        <Box
          display={"flex"}
          w="100%"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} alignItems={"center"} gap={"5px"}>
            <InputGroup>
              {show ? (
                <InputLeftElement>
                  <AiOutlineSearch size={"20px"} />
                </InputLeftElement>
              ) : (
                <InputRightElement onClick={handleReset}>
                  <RxCross2 size={"20px"} />
                </InputRightElement>
              )}

              <Input
                type="text"
                placeholder="Search"
                fontSize={"20px"}
                _focusVisible={{
                  outline: "none",
                  borderBottom: "1px solid gray",
                }}
                outline={"none"}
                border={"none"}
                borderBottom={"1px solid gray"}
                borderRadius={"0px"}
                onChange={handleChange}
                value={search}
              />
            </InputGroup>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"15px"}>
            <Box w="50%">
              <Text fontSize={"20px"}>Sort By:</Text>
            </Box>
            <Select onChange={handleSort}>
              <option value="priority">Priority</option>
              <option value="projectName">Project Name</option>
              <option value="reason">Reason</option>
              <option value="type">Type</option>
              <option value="division">Division</option>
              <option value="category">Category</option>
              <option value="department">Department</option>
              <option value="location">Location</option>
              <option value="status">Status</option>
            </Select>
          </Box>
        </Box>
        <Box w="100%" mt="20px">
          <TableContainer>
            <Box
              style={{ maxHeight: "550px", overflowY: "auto" }}
              css={{
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "transparent",
                },
              }}
            >
              <Table variant="simple" size={"sm"}>
                <Thead bg="#ebf5ff" position={"sticky"} top={0} zIndex={100}>
                  <Tr>
                    <Th>Project Name</Th>
                    <Th>Reason</Th>
                    <Th>Type</Th>
                    <Th>Division</Th>
                    <Th>Category</Th>
                    <Th>Priority</Th>
                    <Th>Dept.</Th>
                    <Th>Location</Th>
                    <Th>Project Manager</Th>
                    <Th>Status</Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projects &&
                    projects.map((el, i) => (
                      <DesktopTableRow
                        key={el._id}
                        id={el._id}
                        projectName={el.projectName}
                        location={el.location}
                        projectManager={el.projectManager}
                        startDate={el.startDate}
                        endDate={el.endDate}
                        priority={el.priority}
                        reason={el.reason}
                        type={el.type}
                        division={el.division}
                        category={el.category}
                        department={el.department}
                        status={el.status}
                        updateStatus={updateStatus} // Corrected function name
                      />
                    ))}
                </Tbody>
              </Table>
            </Box>
          </TableContainer>
        </Box>
        <Box
          w="100%"
          h="20%"
          display={loading ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner size={"md"} />
        </Box>
        <Box
          w="100%"
          h="20%"
          display={error ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text color={"red"}>Error while loading data</Text>
        </Box>
      </Box>

      {/* Pagination */}
      <Box
        w="30%"
        margin={"auto"}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        mt={"85vh"}
      >
        <Button
          // w={"90%"}
          borderRadius={"40%"}
          isDisabled={curr === 1}
          onClick={prevPage}
        >
          {/* <GrFormPrevious size={"20px"} color={"black"} bg="transparent" />
          <GrFormPrevious size={"20px"} color={"black"} bg="transparent" /> */}
          <MdKeyboardDoubleArrowLeft /><MdChevronLeft/>
        </Button>
        <Pagination
          totalPage={totalPages}
          page={curr}
          onChange={handlePageChange}
        />
        <Button
          borderRadius={"40%"}
          isDisabled={curr === totalPages}
          onClick={nextPage}
          color={"black"}
          bg="transparent"
        >
          {/* <GrFormNext size={"20px"} color={"black"} bg="transparent" />
          <GrFormNext size={"20px"} color={"black"} bg="transparent" /> */}
          <MdChevronRight/> <MdKeyboardDoubleArrowRight/>
        </Button>
      </Box>
    </>
  );
}
