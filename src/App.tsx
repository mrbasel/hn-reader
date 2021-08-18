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

  function getPosts(setPosts: Function, endpoint: string) {
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
            <Link as={RouterLink} to="/newest" mx="4">
              New
            </Link>
          </Box>
        </Flex>
        <Switch>
          <Route path="/top" key="/top">
            <PostsList
              posts={posts}
              getPosts={() => getPosts(setPosts, "news")}
            />
          </Route>
          <Route path="/ask" key="/ask">
            <PostsList
              posts={askPosts}
              getPosts={() => getPosts(setAskPosts, "ask")}
            />
          </Route>
          <Route path="/show" key="/show">
            <PostsList
              posts={showPosts}
              getPosts={() => getPosts(setShowPosts, "show")}
            />
          </Route>
          <Route path="/newest" key="/newest">
            <PostsList
              posts={jobPosts}
              getPosts={() => getPosts(setJobPosts, "newest")}
            />
          </Route>
          <Redirect to="/top" />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
export default App;
