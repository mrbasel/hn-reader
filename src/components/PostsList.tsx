import { Box, Button, Center, Heading, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import PostItem from "./PostItem";
import Post from "../interfaces/Post";
import { capitalizeFirstLetter } from "../utils";

interface PostsListProps {
  posts: Post[];
  getPosts: (page: string) => void;
  postsType: "top" | "ask" | "show" | "newest" | "jobs";
}

function PostsList(props: PostsListProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (props.posts.length === 0) props.getPosts(page.toString());
  }, []);

  useEffect(() => {
    if (props.postsType === "top") document.title = "HN App";
    else document.title = `${capitalizeFirstLetter(props.postsType)} - HN`;
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
