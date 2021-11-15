import axios from "axios";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Post from "../interfaces/Post";
import About from "./About";
import PostComments from "./PostComments";
import PostsList from "./PostsList";
import SavedPosts from "./SavedPosts";

function Routes() {
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [askPosts, setAskPosts] = useState<Post[]>([]);
  const [showPosts, setShowPosts] = useState<Post[]>([]);
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const [jobPosts, setJobPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  async function getPosts(
    setPosts: (posts: Post[]) => void,
    endpoint: string,
    page: string
  ) {
    const res = await axios.get<Post[]>(
      `https://node-hnapi.herokuapp.com/${endpoint}?page=${page}`
    );
    const posts = res.data;

    let targetPosts: Post[] = [];
    switch (endpoint) {
      case "news":
        targetPosts = topPosts;
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

      case "jobPosts":
        targetPosts = jobPosts;
        break;

      default:
        break;
    }
    const postsCopy = targetPosts.slice();
    postsCopy.push(...posts);
    setPosts(postsCopy);
  }

  return (
    <Switch>
      <Route path="/top">
        <PostsList
          posts={topPosts}
          getPosts={(page: string) => getPosts(setTopPosts, "news", page)}
          postsType="top"
          savedPosts={savedPosts}
          setSavedPosts={(ids: number[]) => setSavedPosts(ids)}
        />
      </Route>
      <Route path="/ask" key="ask">
        <PostsList
          posts={askPosts}
          getPosts={(page: string) => getPosts(setAskPosts, "ask", page)}
          postsType="ask"
          savedPosts={savedPosts}
          setSavedPosts={(ids: number[]) => setSavedPosts(ids)}
        />
      </Route>
      <Route path="/show" key="show">
        <PostsList
          posts={showPosts}
          getPosts={(page: string) => getPosts(setShowPosts, "show", page)}
          postsType="show"
          savedPosts={savedPosts}
          setSavedPosts={(ids: number[]) => setSavedPosts(ids)}
        />
      </Route>
      <Route path="/newest" key="newest">
        <PostsList
          posts={newPosts}
          getPosts={(page: string) => getPosts(setNewPosts, "newest", page)}
          postsType="newest"
          savedPosts={savedPosts}
          setSavedPosts={(ids: number[]) => setSavedPosts(ids)}
        />
      </Route>
      <Route path="/jobs" key="jobs">
        <PostsList
          posts={jobPosts}
          getPosts={(page: string) => getPosts(setJobPosts, "jobs", page)}
          postsType="jobs"
          savedPosts={savedPosts}
          setSavedPosts={(ids: number[]) => setSavedPosts(ids)}
        />
      </Route>
      <Route path="/about" key="about">
        <About />
      </Route>

      <Route path="/saved" key="saved">
        <SavedPosts />
      </Route>
      <Route exact path={`/post/:id`} key="post">
        <PostComments
          savedPosts={savedPosts}
          setSavedPosts={(ids: number[]) => setSavedPosts(ids)}
        />
      </Route>
      <Redirect to="/top" />
    </Switch>
  );
}

export default Routes;
