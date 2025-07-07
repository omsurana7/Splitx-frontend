import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import AddExpense from "./pages/AddExpense";
import Balances from "./pages/Balances";
import History from "./pages/History";
import Simplify from "./pages/Simplify";
import Transactions from "./pages/Transactions";

import PrivateRoute from "./utils/PrivateRoute";
import UserInfo from "./components/UserInfo"; // ✅ NEW: User Profile Dropdown

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Flex minH="100vh" bg={bg}>
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg="white"
        shadow="md"
        p={5}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Text fontSize="2xl" fontWeight="bold" color="#004C8F" mb={8}>
            SplitX 💸
          </Text>
          <Flex flexDirection="column" gap={4}>
            <ChakraLink as={Link} to="/login" fontWeight="medium" _hover={{ color: "#004C8F" }}>
              🔐 Login
            </ChakraLink>
            <ChakraLink as={Link} to="/add" fontWeight="medium" _hover={{ color: "#004C8F" }}>
              ➕ Add Expense
            </ChakraLink>
            <ChakraLink as={Link} to="/balances" fontWeight="medium" _hover={{ color: "#004C8F" }}>
              ⚖️ Balances
            </ChakraLink>
            <ChakraLink as={Link} to="/history" fontWeight="medium" _hover={{ color: "#004C8F" }}>
              📜 History
            </ChakraLink>
            <ChakraLink as={Link} to="/simplify" fontWeight="medium" _hover={{ color: "#004C8F" }}>
              🤖 Simplify
            </ChakraLink>
            <ChakraLink as={Link} to="/transactions" fontWeight="medium" _hover={{ color: "#004C8F" }}>
              💰 Transactions
            </ChakraLink>
          </Flex>
        </Box>

        <Box textAlign="center" mt={10}>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
          />
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={6}>
        <UserInfo /> {/* ✅ Profile Section */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="/balances"
            element={
              <PrivateRoute>
                <Balances />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="/simplify"
            element={
              <PrivateRoute>
                <Simplify />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;
