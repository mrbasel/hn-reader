import { Box, Center, Link, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  Route,
  Switch,
  Link as RouterLink,
  useRouteMatch,
} from "react-router-dom";

import PostItem from "./PostItem";
import PostComments from "./PostComments";
import { Post } from "../interfaces/Post";

function PostsList(props: any) {
  let { path, url } = useRouteMatch();

  useEffect(() => {
    if (props.posts.length === 0) props.loadData();
  }, []);

  // Show loading spinner if posts havent loaded yet
  if (props.posts.length === 0) {
    return (
      <Center height="90vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Switch>
      <Route exact path={`${path}/post/:id`} key="post">
        <PostComments
          commentIds={props.posts.map((post: Post) => {
            return { id: post.id, commentIds: post.kids };
          })}
        />
      </Route>
      <Route path="/" key="root">
        <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
          {props.posts.map((post: Post, i: number) => (
            <Box>
              <PostItem
                key={post.id}
                id={post.id}
                index={i + 1}
                link={post.url}
                title={post.title}
                author={post.by}
                points={post.score}
                comments={post.descendants}
                type={post.type}
                unixTime={post.time}
                authorPage={"https://news.ycombinator.com/user?id=" + post.by}
              >
                <Link
                  as={RouterLink}
                  to={`${url}/post/${post.id}`}
                  color="whiteAlpha.700"
                >
                  {post.descendants} comments
                </Link>
              </PostItem>
            </Box>
          ))}
        </Box>
      </Route>
    </Switch>
  );
}

export default PostsList;
