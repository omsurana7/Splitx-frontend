import { useState } from "react";
import axios from "axios";
import axios from "../utils/axiosSetup"

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [sharedWith, setSharedWith] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const user_id = parseInt(localStorage.getItem("user_id"));
  const token = localStorage.getItem("token");

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const sharedArray = sharedWith
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    try {
      const res = await axios.post(
        "https://splitx-backend.onrender.com",
        {
          title,
          amount: parseFloat(amount),
          paid_by: user_id,
          shared_with: sharedArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ JWT token sent here
          },
        }
      );

      setMessage(`✅ Expense added successfully (ID: ${res.data.expense_id})`);
      setTitle("");
      setAmount("");
      setSharedWith("");

      toast({
        title: "Expense Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // 👉 Redirect to balances page to reflect update
      navigate("/balances");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add expense.");
      toast({
        title: "Add Expense Failed",
        description:
          err.response?.data?.detail || "Check your input or server connection.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, #004C8F, #0078D4)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <Box
        bg="whiteAlpha.900"
        color="black"
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        w="full"
        maxW="md"
      >
        <Heading mb={6} color="#004C8F" textAlign="center">
          Add New Expense 💸
        </Heading>

        <form onSubmit={handleAddExpense}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Expense Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bg="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                bg="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Shared With (comma-separated user IDs)</FormLabel>
              <Textarea
                value={sharedWith}
                onChange={(e) => setSharedWith(e.target.value)}
                bg="white"
                placeholder="Example: 1,2,3"
              />
            </FormControl>

            <Button
              type="submit"
              bg="#0078D4"
              color="white"
              _hover={{ bg: "#005999" }}
              w="full"
            >
              Add Expense
            </Button>

            {message && (
              <Text fontSize="sm" color="gray.700" textAlign="center">
                {message}
              </Text>
            )}
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default AddExpense;
