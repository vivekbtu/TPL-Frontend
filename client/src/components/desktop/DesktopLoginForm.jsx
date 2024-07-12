import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Image, Input, InputGroup, InputRightElement, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

let init = {
  email: "",
  password: "",
};

export default function DesktopLoginForm({ loginFunction, loading, err }) {
  let [passErr, setPassErr] = useState(false);
  let [mailErr, setMailErr] = useState(false);
  let [data, setData] = useState(init);
  let [errors, setErrors] = useState({});
  let { email, password } = data;
  // let [isValid, setIsValid] = useState(false);

  // Handling changes in the form
  let handleChange = async (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors({ ...errors, [name]: undefined });
    } catch (error) {
      setErrors({ ...errors, [name]: error.message });
    }
  };

  // Handle form submission
  let handleClick = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      loginFunction(data);
      setData(init);
    } catch (error) {
      let validationErrors = {};
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      position={"absolute"}
      w="28%"
      top={"15%"}
      left={"39%"}
      display={{ base: "none", sm: "none", md: "block", lg: "block" }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap="10px"
        py="20px"
      >
        <Image src="/assets/Logo.svg" alt="error" />
        <Text color={"#FFFFFF"}>Online Project Management</Text>
      </Box>

      <Box
        px={"30px"}
        py="50px"
        bg="#FFFFFF"
        borderRadius={"10px"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={"2xl"}>Login to get started</Text>
        </Box>
        <form onSubmit={handleClick}>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"} mt="40px">
            <FormControl isInvalid={!!errors.email || mailErr}>
              <FormLabel color={"grey"}>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {errors.email || mailErr ? (
                <FormErrorMessage>{errors.email || 'Email is required.'}</FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={!!errors.password || passErr}>
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
                justifyContent={errors.password || passErr ? "space-between" : "flex-end"}
                alignItems="center"
              >
                {errors.password || passErr ? (
                  <FormErrorMessage>{errors.password || 'Password is required.'}</FormErrorMessage>
                ) : null}
                <FormHelperText color={"#367cbd"} fontWeight={"bold"}>
                  Forgot password?
                </FormHelperText>
              </Box>
            </FormControl>
            <Button colorScheme="#FFFFFF"
              type="submit"
              size={"md"}
              width={"50%"}
              m="auto"
              borderRadius={"20px"}
              bg="#035fb2"
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" color={"blue.500"} /> : "Login"}
            </Button>
          </Box>
        </form>
      </Box>
      <Box display={err ? "flex" : "none"} justifyContent={"center"} py="20px">
        <Text color={"red"}>Invalid credentials</Text>
      </Box>
    </Box>
  );
}
