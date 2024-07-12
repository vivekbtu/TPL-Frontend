import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdChevronLeft, MdChevronRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BsFilterLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import MobileProjectCard from "./MobileProjectCard";
import { getProj, updateProj } from "../../redux/project/project.action";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Pagination } from "../desktop/Pagination";

export default function MobileProjectListing() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  let { projects, loading, error, total } = useSelector(
    (store) => store.projects
  );
  let { data } = useSelector((store) => store.auth);
  let dispatch = useDispatch();
  let [curr, setCurr] = useState(1);
  let [search, setSearch] = useState("");
  let [sort, setSort] = useState("");
  let [show, setShow] = useState(true);

  let totalPages = Math.ceil(total / 5);
  console.log("TotalPages", totalPages);

    // Function to handle page change
    const handlePageChange = (page) => {
      setCurr(page);
    };

  // search handler
  let handleChange = (e) => {
    setSearch(e.target.value);
    if (search.length !== 0) {
      setShow(false);
    }
  };
  //reset handler
  let handleReset = () => {
    setSearch("");
    setShow(true);
  };
  //sort handler
  let handleSort = (e) => {
    setSort(e.target.value);
  };
  // pagination next page handler
  let nextPage = () => {
    setCurr((prev) => prev + 1);
  };
  // pagination previous page handler
  let prevPage = () => {
    setCurr((prev) => prev - 1);
  };
  //updating status
  let updatStatus = (val, id) => {
    updateProj(data.token, { status: val }, id)
      .then((res) => {
        if (res) {
          dispatch(getProj(data, search, sort, curr));
        } else {
          alert("Error hile updating status");
        }
      })
      .catch((err) => {
        alert("Error hile updating status");
      });
  };
  // data from api basis on page sort adn search
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(getProj(data, search, sort, curr));
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [search, sort, curr]);
  return (
    <>
      <Box
        display={"flex"}
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
        px="10px"
        mt="20px"
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
                borderBottom: "1px solid blue",
              }}
              outline={"none"}
              border={"none"}
              borderBottom={"1px solid blue"}
              borderRadius={"0px"}
              onChange={handleChange}
              value={search}
            />
          </InputGroup>
        </Box>
        {/* <Button ref={btnRef} onClick={onOpen}>
          <BsFilterLeft size={"30px"} />
        </Button> */}
        <Box display={"grid"} alignItems={"center"} textAlign={"end"} gap={"5px"}>
            <Box w="100%">
              <Text fontSize={"14px"}>Sort By:</Text>
            </Box>
            <Select onChange={handleSort} borderColor={"transparent"} >
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
      {/* <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sort Project By</DrawerHeader>
          <DrawerBody>
            <Text onClick={() => handleSort("priority")}>Priority</Text>
            <Text onClick={() => handleSort("projectName")}>Project Name</Text>
            <Text onClick={() => handleSort("reason")}>Reason</Text>
            <Text onClick={() => handleSort("type")}>Type</Text>
            <Text onClick={() => handleSort("division")}>Division</Text>
            <Text onClick={() => handleSort("category")}>Category</Text>
            <Text onClick={() => handleSort("department")}>Department</Text>
            <Text onClick={() => handleSort("location")}>Location</Text>
            <Text onClick={() => handleSort("status")}>Status</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}
      <Box w="100%" mt="20px">
        {projects &&
          projects.map((el, i) => {
            return (
              <MobileProjectCard
                key={el._id}
                id={el._id}
                projectName={el.projectName}
                location={el.location}
                startDate={el.startDate}
                endDate={el.endDate}
                priority={el.priority}
                reason={el.reason}
                type={el.type}
                division={el.division}
                category={el.category}
                department={el.department}
                status={el.status}
                updatStatus={updatStatus}
              />
            );
          })}
      </Box>
      <Box
        w="100%"
        h="70vh"
        display={loading ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner size={"md"} />
      </Box>
      <Box
        w="100%"
        h="70vh"
        display={error ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text color={"red"}>Error while loading data</Text>
      </Box>

      {/* Pagination */}
      <Box
        w="90%"
        margin={"auto"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt="20px"
        pb="70px"
      >
        <Button
          borderRadius={"40%"}
          isDisabled={curr === 1}
          onClick={prevPage}
          size={"sm"}
        >
          <MdKeyboardDoubleArrowLeft /><MdChevronLeft/>
          {/* <GrFormPrevious size={"20px"} color={"black"} bg="transparant" />
          <GrFormPrevious size={"20px"} color={"black"} bg="transparant" /> */}
        </Button>
        <Pagination
          totalPage={totalPages}
          page={curr}
          onChange={handlePageChange}
        />
        <Button
          size={"sm"}
          borderRadius={"40%"}
          isDisabled={curr === totalPages}
          onClick={nextPage}
          color={"black"}
          bg="transparant"
        >
          <MdChevronRight/> <MdKeyboardDoubleArrowRight/>
          {/* <GrFormNext size={"20px"} color={"black"} bg="transparant" />
          <GrFormNext size={"20px"} color={"black"} bg="transparant" /> */}
        </Button>
      </Box>
    </>
  );
}
