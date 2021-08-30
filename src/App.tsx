import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import theme from "./theme";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import Routes from "./components/Routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes />
      </Router>
    </ChakraProvider>
  );
}
export default App;
