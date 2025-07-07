// src/components/UserInfo.jsx

import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";

function UserInfo() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Flex justifyContent="flex-end" alignItems="center" mb={4}>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="outline"
          colorScheme="blue"
        >
          {user.name}
        </MenuButton>
        <MenuList>
          <Box px={4} py={2}>
            <Text fontWeight="bold">{user.name}</Text>
            <Text fontSize="sm">{user.email}</Text>
          </Box>
          <MenuItem onClick={logout} color="red.500">
            🚪 Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default UserInfo;
