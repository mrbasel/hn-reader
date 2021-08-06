import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

import PostItem from "./PostItem";

interface Post {
  id: Number;
  url: String;
  title: String;
  by: String;
  score: Number;
  descendants: Number;
  type: String;
}

function PostsList(props: any) {
  useEffect(() => {
    props.loadData(props.posts);
  }, []);

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
        />
      ))}
    </Box>
  );
}

export default PostsList;
