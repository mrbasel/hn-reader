import { Box } from "@chakra-ui/react";
import { Redirect, Route, Switch } from "react-router-dom";
import PostComments from "./PostComments";
import PostsList from "./PostsList";

function Routes() {
  return (
    <Box w="full">
      <Switch>
        <Route path="/top">
          <PostsList postsType="news" />
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

        <Route exact path={`/post/:id`} key="post">
          <PostComments />
        </Route>
        <Redirect to="/top" />
      </Switch>
    </Box>
  );
}

export default Routes;
