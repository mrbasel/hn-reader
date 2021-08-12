import { Box, Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

import PostItem from "./PostItem";
import { Post } from "../interfaces/Post";

function PostsList(props: any) {
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
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      {props.posts.map((post: Post, i: number) => (
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
        />
      ))}
    </Box>
  );
}

export default PostsList;
