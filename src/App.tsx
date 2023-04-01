import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import theme from "./theme";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Routes from "./components/Routes";
import { Footer } from "./components/Footer";

import "./styles/global.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box height="full">
          <ScrollToTop />
          <Header />
          <Flex
            h="90%"
            flexDir="column"
            justify="space-between"
            alignItems="center"
          >
            <Routes />
            <Footer />
          </Flex>
        </Box>
      </Router>
    </ChakraProvider>
  );
}
export default App;
