import { Box, Button, Center, Link, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  Link as RouterLink,
  useRouteMatch,
} from "react-router-dom";

import PostItem from "./PostItem";
import PostComments from "./PostComments";
import Post from "../interfaces/Post";

interface PostsListProps {
  posts: Post[];
  getPosts: Function;
}

function PostsList(props: PostsListProps) {
  let { path, url } = useRouteMatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (props.posts.length === 0) props.getPosts(page.toString());
  }, []);

  // Fetch posts each time page changes
  useEffect(() => {
    if (page !== 1) props.getPosts(page.toString());
  }, [page]);

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
      {/* Route for comments page */}
      <Route exact path={`${path}/post/:id`} key="post">
        <PostComments />
      </Route>
      <Route path="/" key="root">
        <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
          {props.posts.map((post: Post, i: number) => (
            <PostItem key={post.id} index={i} post={post}>
              {/* Link that points to comments page for given post */}
              {post.comments_count >= 0 && (
                <Link
                  as={RouterLink}
                  to={`${url}/post/${post.id}`}
                  color="whiteAlpha.700"
                >
                  {post.comments_count} comments
                </Link>
              )}
            </PostItem>
          ))}

          <Center>
            <Button
              display={page > 5 ? "none" : "block"}
              mt="4"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Load more
            </Button>
          </Center>
        </Box>
      </Route>
    </Switch>
  );
}

export default PostsList;
