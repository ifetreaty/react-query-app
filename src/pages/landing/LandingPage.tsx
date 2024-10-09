import { Box, Text } from "@chakra-ui/react";
import React  from "react";
export default function LandingPage() {
  return (
    <Box p={5}>
      <Text fontSize="xl" mb={4}>
        Welcome to the Application
      </Text>
      <Text>
        This is the landing page with some dummy text to fill up the space. You
        can navigate to different sections using the sidebar.
      </Text>
    </Box>
  );
}
