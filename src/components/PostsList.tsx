import { usePosts } from "@/hooks/usePosts";
import { useSetPageTitle } from "@/hooks/useSetPageTitle";
import Post from "@/interfaces/Post";
import { Box, Button, Center } from "@chakra-ui/react";
import { useState } from "react";
import { Route } from "react-router-dom";
import { capitalizeFirstLetter } from "utils";
import { PostType } from "../interfaces";
import { Loading } from "./Loading";
import PostItem from "./PostItem";

interface PostsListProps {
  postsType: PostType;
}

function PostsList({ postsType }: PostsListProps) {
  const [page, setPage] = useState(1);
  const { posts, isLoading } = usePosts({
    postType: postsType,
    pageNumber: page,
  });

  useSetPageTitle(
    postsType === "newest"
      ? "HN App"
      : `${capitalizeFirstLetter(postsType)} - HN`
  );

  if (isLoading) return <Loading />;

  return (
    <Route path="/" key="root">
      <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
        {posts.map((post: Post, i: number) => (
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
