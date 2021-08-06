import { Box, ChakraProvider, Flex, Heading, Link } from "@chakra-ui/react";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import PostsList from "./components/PostsList";

interface Post {
  id: Number;
  url: String;
  title: String;
  by: String;
  score: Number;
  descendants: Number;
  type: String;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [askPosts, setAskPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState<Post[]>([]);
  const [jobPosts, setJobPosts] = useState<Post[]>([]);

  function loadData(posts: Post[], setPosts: Function, endpoint: String) {
    if (posts.length === 0) {
      axios
        .get<Number[]>(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`)
        .then((res) =>
          Promise.all(
            res.data
              .slice(0, 10)
              .map((id: Number) =>
                axios.get<Post>(
                  `https://hacker-news.firebaseio.com/v0/item/${id}.json`
                )
              )
          )
        )
        .then((data: AxiosResponse[]) => {
          setPosts(data.map((post) => post.data));
        });
    }
  }

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
            <PostsList
              posts={posts}
              loadData={(posts: Post[]) =>
                loadData(posts, setPosts, "topstories")
              }
            />
          </Route>
          <Route path="/ask" key="/ask">
            <PostsList
              posts={askPosts}
              loadData={(posts: Post[]) =>
                loadData(posts, setAskPosts, "askstories")
              }
            />
          </Route>
          <Route path="/show" key="/show">
            <PostsList
              posts={showPosts}
              loadData={(posts: Post[]) =>
                loadData(posts, setShowPosts, "showstories")
              }
            />
          </Route>
          <Route path="/jobs" key="/jobs">
            <PostsList
              posts={jobPosts}
              loadData={(posts: Post[]) =>
                loadData(posts, setJobPosts, "jobstories")
              }
            />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
export default App;
