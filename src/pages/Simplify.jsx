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

function Simplify() {
  const [settlements, setSettlements] = useState([]);
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

        const res = await axios.get(`/expense/simplify`);
        setSettlements(res.data);
      } catch (err) {
        console.error("Error fetching simplified settlements:", err);
        setError("Could not fetch simplified dues.");
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
      <Heading mb={6}>🤖 Simplified Settlements</Heading>

      {loading ? (
        <Spinner size="lg" color="white" />
      ) : error ? (
        <Alert status="error" borderRadius="md" bg="red.600" color="white">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch">
          {settlements.length === 0 ? (
            <Text>✅ All dues are settled!</Text>
          ) : (
            settlements.map((txn, index) => (
              <Box
                key={index}
                bg={cardBg}
                color="black"
                borderRadius="md"
                boxShadow="md"
                p={4}
              >
                <Text>
                  <strong>{userMap[txn.from] || `User ${txn.from}`}</strong> ➡️{" "}
                  <strong>{userMap[txn.to] || `User ${txn.to}`}</strong> : ₹
                  {txn.amount}
                </Text>
              </Box>
            ))
          )}
        </VStack>
      )}
    </Box>
  );
}

export default Simplify;
