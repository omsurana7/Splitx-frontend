import { useEffect, useState } from "react";
import axios from "../utils/axiosSetup"; // ✅ use shared axios instance
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  useColorModeValue,
  Badge,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function History() {
  const [history, setHistory] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!user_id) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const usersRes = await axios.get("/user/users");
        const map = {};
        usersRes.data.forEach((u) => {
          map[u.id] = u.name;
        });
        setUserMap(map);

        const res = await axios.get(`/expense/history`);
        setHistory(res.data.history);
      } catch (err) {
        console.error("Error loading history:", err);
        setError("Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user_id]);

  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #004C8F, #0078D4)"
      p={10}
      color="white"
    >
      <Heading mb={6}>📜 Your Expense History</Heading>

      {loading ? (
        <Spinner size="lg" color="white" />
      ) : error ? (
        <Alert status="error" borderRadius="md" bg="red.600" color="white">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch">
          {history.length === 0 ? (
            <Text>No expenses yet.</Text>
          ) : (
            history.map((exp) => (
              <Box
                key={exp.expense_id}
                bg={cardBg}
                color="black"
                borderRadius="md"
                boxShadow="md"
                p={4}
              >
                <Text fontWeight="bold" fontSize="lg" mb={1}>
                  {exp.title} — ₹{exp.total_amount}
                </Text>
                <Text fontSize="sm" mb={1}>
                  <strong>You paid:</strong> ₹{exp.user_share}
                </Text>
                <Text fontSize="sm">
                  <strong>Paid by:</strong>{" "}
                  {userMap[exp.paid_by] || `User ${exp.paid_by}`}
                </Text>
                <Badge colorScheme="blue" mt={2}>
                  {exp.date}
                </Badge>
              </Box>
            ))
          )}
        </VStack>
      )}
    </Box>
  );
}

export default History;
