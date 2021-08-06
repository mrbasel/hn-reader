import { Box, ChakraProvider, Flex, Heading, Link } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import PostsList from "./components/PostsList";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex as="nav" justifyContent="space-around" alignItems="center">
          <Heading>
            <Link as={RouterLink} to="/">
              Hacker News
            </Link>
          </Heading>
          <Box>
            <Link as={RouterLink} to="/ask" mx="4">
              Ask
            </Link>
            <Link as={RouterLink} to="/show" mx="4">
              Show
            </Link>
            <Link as={RouterLink} to="/jobs" mx="4">
              Jobs
            </Link>
          </Box>
        </Flex>
        <Switch>
          <Route exact path="/" key="/">
            <PostsList endpoint="topstories" />
          </Route>
          <Route path="/ask" key="/ask">
            <PostsList endpoint="askstories" />
          </Route>
          <Route path="/show" key="/show">
            <PostsList endpoint="showstories" />
          </Route>
          <Route path="/jobs" key="/jobs">
            <PostsList endpoint="jobstories" />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
export default App;
