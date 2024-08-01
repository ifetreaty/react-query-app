import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";
import theme from "./theme";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex direction="column" minHeight="100vh">
          <AppHeader />
          <Flex flex="1">
            <AppSidebar />
            <AppRoutes />
          </Flex>
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

export default App;
