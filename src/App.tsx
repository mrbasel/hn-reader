import { Box, ChakraProvider, Flex, Heading, Link } from "@chakra-ui/react";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
  Redirect,
} from "react-router-dom";

import PostsList from "./components/PostsList";
import Post from "./interfaces/Post";
import theme from "./theme";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [askPosts, setAskPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState<Post[]>([]);
  const [jobPosts, setJobPosts] = useState<Post[]>([]);

  function loadData(setPosts: Function, endpoint: string) {
    axios
      .get<Post[]>(`https://node-hnapi.herokuapp.com/${endpoint}`)
      .then((res: AxiosResponse) => {
        setPosts(res.data);
      });
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex as="nav" justifyContent="space-around" alignItems="center">
          <Heading>
            <Link as={RouterLink} to="/top">
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
          <Route path="/top" key="/top">
            <PostsList
              posts={posts}
              loadData={() => loadData(setPosts, "news")}
            />
          </Route>
          <Route path="/ask" key="/ask">
            <PostsList
              posts={askPosts}
              loadData={() => loadData(setAskPosts, "ask")}
            />
          </Route>
          <Route path="/show" key="/show">
            <PostsList
              posts={showPosts}
              loadData={() => loadData(setShowPosts, "show")}
            />
          </Route>
          <Route path="/jobs" key="/jobs">
            <PostsList
              posts={jobPosts}
              loadData={() => loadData(setJobPosts, "jobs")}
            />
          </Route>
          <Redirect to="/top" />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
export default App;
