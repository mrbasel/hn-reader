import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PostsList from "./components/PostsList";
import Post from "./interfaces/Post";
import theme from "./theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [askPosts, setAskPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState<Post[]>([]);
  const [newPosts, setNewPosts] = useState<Post[]>([]);

  function getPosts(setPosts: Function, endpoint: string, page: string) {
    axios
      .get<Post[]>(`https://node-hnapi.herokuapp.com/${endpoint}?page=${page}`)
      .then((res: AxiosResponse) => {
        let targetPosts: Post[] = [];
        switch (endpoint) {
          case "news":
            targetPosts = posts;
            break;

          case "ask":
            targetPosts = askPosts;
            break;

          case "show":
            targetPosts = showPosts;
            break;

          case "newest":
            targetPosts = newPosts;
            break;

          default:
            break;
        }
        const postsCopy = targetPosts.slice();
        postsCopy.push(...res.data);
        setPosts(postsCopy);
      });
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Header />
        <Switch>
          <Route path="/top" key="/top">
            <PostsList
              posts={posts}
              getPosts={(page: string) => getPosts(setPosts, "news", page)}
            />
          </Route>
          <Route path="/ask" key="/ask">
            <PostsList
              posts={askPosts}
              getPosts={(page: string) => getPosts(setAskPosts, "ask", page)}
            />
          </Route>
          <Route path="/show" key="/show">
            <PostsList
              posts={showPosts}
              getPosts={(page: string) => getPosts(setShowPosts, "show", page)}
            />
          </Route>
          <Route path="/newest" key="/newest">
            <PostsList
              posts={newPosts}
              getPosts={(page: string) => getPosts(setNewPosts, "newest", page)}
            />
          </Route>
          <Redirect to="/top" />
        </Switch>
      </Router>
      <Footer></Footer>
    </ChakraProvider>
  );
}
export default App;
