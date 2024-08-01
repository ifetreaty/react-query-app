import { Box, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  return (
    <Box width="250px" bg="gray.100" p={4}>
      <VStack align="start">
        <Button as={Link} to="/users" w="100%" justifyContent="start">
          Users List
        </Button>
        <Button as={Link} to="/add-post" w="100%" justifyContent="start">
          Add Post
        </Button>
        <Button as={Link} to="/posts" w="100%" justifyContent="start">
          View Posts
        </Button>
        <Button as={Link} to="/comments" w="100%" justifyContent="start">
          View Comments
        </Button>
        <Button as={Link} to="/albums" w="100%" justifyContent="start">
          View Albums
        </Button>
        <Button as={Link} to="/photos" w="100%" justifyContent="start">
          View Photos
        </Button>
        <Button as={Link} to="/todos" w="100%" justifyContent="start">
          View Todos
        </Button>
      </VStack>
    </Box>
  );
};

export default AppSidebar;
