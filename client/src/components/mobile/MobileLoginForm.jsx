import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";

let init = {
  email: "",
  password: "",
};

export default function MobileLoginForm({ loginFunction, err, loading }) {
  let [passErr, setPassErr] = useState(false);
  let [mailErr, setMailErr] = useState(false);
  let [data, setData] = useState(init);
  let { email, password } = data;

  // capuring changes
  let handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMailErr(false);
    setPassErr(false);
  };
  // login handler
  let handleClick = (e) => {
    e.preventDefault();
    if (data.email === "" && data.password === "") {
      setMailErr(true);
      setPassErr(true);
      return;
    }

    if (data.email === "") {
      setMailErr(true);
      return;
    }

    if (data.password === "") {
      setPassErr(true);
      return;
    }

    loginFunction(data);
    setData(init);
  };
  return (
    <>
      <Box w="100%" px={"20px"} py="20px" bg="#FFFFFF" mt="30px">
        <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
          <Text fontSize={"2xl"}>Login to get started</Text>
        </Box>
        <form onSubmit={handleClick}>
          <Box display={"flex"} flexDirection={"column"} gap={"12px"} mt="40px">
            <FormControl isInvalid={mailErr}>
              <FormLabel color={"grey"}>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {mailErr ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={passErr}>
              <FormLabel color={"grey"}>Password</FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  colorScheme="gery"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <InputRightElement>
                  <Image src="/assets/hide-password.svg" alt="error" />
                </InputRightElement>
              </InputGroup>
              <Box
                display={"flex"}
                justifyContent={passErr ? "space-between" : "right"}
              >
                {passErr ? (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                ) : null}
                <FormHelperText color={"#367cbd"} fontWeight={"bold"}>
                  Forgot password?
                </FormHelperText>
              </Box>
            </FormControl>
            <Box display={err ? "flex" : "none"} justifyContent={"left"}>
              <Text color={"red"}>Invalid credentials</Text>
            </Box>
            <Button
              type="submit"
              size={"md"}
              borderRadius={"20px"}
              color={"#FFFFFF"}
              bg="#035fb2"
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" color={"blue.500"} /> : "Login"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
