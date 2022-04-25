import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import About from "./About";
import PostComments from "./PostComments";
import PostsList from "./PostsList";
// import SavedPosts from "./SavedPosts";

function Routes() {
  // const [savedPosts, setSavedPosts] = useState<number[]>([]);

  return (
    <Switch>
      <Route path="/top">
        <PostsList postsType="newest" />
      </Route>
      <Route path="/ask" key="ask">
        <PostsList postsType="ask" />
      </Route>
      <Route path="/show" key="show">
        <PostsList postsType="show" />
      </Route>
      <Route path="/newest" key="newest">
        <PostsList postsType="newest" />
      </Route>
      <Route path="/jobs" key="jobs">
        <PostsList postsType="jobs" />
      </Route>
      <Route path="/about" key="about">
        <About />
      </Route>

      {/* <Route path="/saved" key="saved">
        <SavedPosts />
      </Route> */}
      <Route exact path={`/post/:id`} key="post">
        <PostComments />
      </Route>
      <Redirect to="/top" />
    </Switch>
  );
}

export default Routes;
