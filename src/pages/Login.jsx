// src/pages/Login.jsx

import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/user/login", {
        email,
        password,
      });

      // Save session data
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user_id", res.data.user_id);

      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Slight delay to ensure localStorage is set before redirect
      setTimeout(() => {
        navigate("/balances");
      }, 100);
    } catch (err) {
      console.error(err);
      toast({
        title: "Login failed",
        description:
          err.response?.data?.detail || "Server unreachable or bad credentials",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, #004C8F, #0078D4)"
    >
      <Box
        bg="whiteAlpha.900"
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        backdropFilter="blur(12px)"
        w="full"
        maxW="md"
        color="black"
      >
        <Heading mb={6} textAlign="center" color="#004C8F">
          SplitX Login 🔐
        </Heading>

        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="white"
              />
            </FormControl>

            <Button
              type="submit"
              bg="#0078D4"
              color="white"
              w="full"
              _hover={{ bg: "#005999" }}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
