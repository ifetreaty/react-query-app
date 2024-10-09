import { Box, Heading } from "@chakra-ui/react";
import React from 'react'
const AppHeader = () => {
  return (
    <Box bg="teal.500" p={4} color="white" minWidth="100vw">
      <Heading size="md">React Query</Heading>
    </Box>
  );
};

export default AppHeader;
