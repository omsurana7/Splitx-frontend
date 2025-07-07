import { useEffect, useState } from "react";
import axios from "../utils/axiosSetup"; // ✅ custom axios instance
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

function Balances() {
  const [balances, setBalances] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!user_id) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const usersRes = await axios.get("/user/users");
        const map = {};
        usersRes.data.forEach((u) => {
          map[u.id] = u.name;
        });
        setUserMap(map);

        const res = await axios.get(`/expense/balances`);
        setBalances(res.data.net_balances);
      } catch (err) {
        console.error("Error fetching balances:", err);
        setError("Failed to load balances. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #004C8F, #0078D4)"
      p={10}
      color="white"
    >
      <Heading mb={6}>⚖️ Your Balances</Heading>

      {loading ? (
        <Spinner size="lg" color="white" />
      ) : error ? (
        <Alert status="error" borderRadius="md" bg="red.600" color="white">
          <AlertIcon />
          {error}
        </Alert>
      ) : balances.length === 0 ? (
        <Text>✅ All clear! You don’t owe or get anything.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {balances.map((entry, idx) => (
            <Box
              key={idx}
              bg={cardBg}
              color="black"
              borderRadius="md"
              boxShadow="md"
              p={4}
            >
              <Text>
                <strong>{userMap[entry.from] || `User ${entry.from}`}</strong>{" "}
                ➡️{" "}
                <strong>{userMap[entry.to] || `User ${entry.to}`}</strong> : ₹
                {entry.amount}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default Balances;
