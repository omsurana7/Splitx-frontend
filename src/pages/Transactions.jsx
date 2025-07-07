import { useEffect, useState } from "react";
import axios from "../utils/axiosSetup";
import {
  Box,
  Heading,
  VStack,
  Text,
  Spinner,
  useColorModeValue,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user_id = localStorage.getItem("user_id");
  const cardBg = useColorModeValue("white", "gray.700");

  useEffect(() => {
    if (!user_id) {
      setError("User not found. Please login again.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const usersRes = await axios.get("/user/users");
        const map = {};
        usersRes.data.forEach((user) => {
          map[user.id] = user.name;
        });
        setUserMap(map);

        const res = await axios.get(`/expense/transactions`);
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Could not load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #004C8F, #0078D4)"
      p={10}
      color="white"
    >
      <Heading mb={6}>💰 Your Transactions</Heading>

      {loading ? (
        <Spinner size="lg" color="white" />
      ) : error ? (
        <Alert status="error" borderRadius="md" bg="red.600" color="white">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch">
          {transactions.length === 0 ? (
            <Text>No transactions yet.</Text>
          ) : (
            transactions.map((txn, index) => (
              <Box
                key={index}
                bg={cardBg}
                color="black"
                borderRadius="md"
                boxShadow="md"
                p={4}
              >
                <Text>
                  <strong>
                    {userMap[txn.payer_id] || `User ${txn.payer_id}`}
                  </strong>{" "}
                  paid <strong>₹{txn.amount}</strong> to{" "}
                  <strong>{userMap[txn.receiver_id] || `User ${txn.receiver_id}`}</strong>
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {txn.timestamp}
                </Text>
              </Box>
            ))
          )}
        </VStack>
      )}
    </Box>
  );
}

export default Transactions;
