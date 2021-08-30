import { Box, Button, Center, Link, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Link as RouterLink } from "react-router-dom";

import PostItem from "./PostItem";
import Post from "../interfaces/Post";

interface PostsListProps {
  posts: Post[];
  getPosts: (page: string) => void;
}

function PostsList(props: PostsListProps) {
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
    <Route path="/" key="root">
      <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
        {props.posts.map((post: Post, i: number) => (
          <PostItem key={post.id} index={i} post={post} />
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
  );
}

export default PostsList;
