import { Box, Button, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import PostItem from "./PostItem";
import Post from "../interfaces/Post";
import { capitalizeFirstLetter } from "../utils";
import { usePosts } from "../hooks/usePosts";
import { PostType } from "../interfaces/PostType";

interface PostsListProps {
  postsType: PostType;
}

function PostsList({ postsType }: PostsListProps) {
  const [page, setPage] = useState(1);
  const { posts } = usePosts({ postType: postsType, pageNumber: page });

  useEffect(() => {
    if (postsType === "news") document.title = "HN App";
    else document.title = `${capitalizeFirstLetter(postsType)} - HN`;
  }, []);

  // Show loading spinner if posts havent loaded yet
  if (posts.length === 0) {
    return (
      <Center height="90vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Route path="/" key="root">
      <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
        {posts.map((post: Post, i: number) => (
          <PostItem
            key={post.id}
            index={i}
            post={post}
            // isSaved={props.savedPosts.includes(post.id)}
            // savePost={savePost}
          />
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
