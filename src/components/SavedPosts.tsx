import { Box, Center, Text } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";

import savedPostsStorage from "../savedPostsStorage";
import Post from "../interfaces/Post";
import PostItem from "./PostItem";

interface SavedPostsProps {}

export default function SavedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Promise.all(fetchPostsData(savedPostsStorage.loadPosts())).then((posts) =>
      setPosts(posts)
    );
  }, []);

  const fetchPostsData = (ids: number[]) => {
    return ids.map(async (id) => {
      const res = await axios.get<Post>(
        `https://node-hnapi.herokuapp.com/item/${id}`
      );
      return res.data;
    });
  };

  if (savedPostsStorage.loadPosts().length === 0)
    return (
      <Center height="50%">
        <Text fontSize="x-large">No saved posts</Text>
      </Center>
    );

  return (
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      {posts.map((post) => (
        <PostItem
          post={post}
          isSaved
          savePost={(postId: number) => {
            setPosts(posts.filter((post) => post.id !== postId));
            savedPostsStorage.removePost(postId);
          }}
        />
      ))}
    </Box>
  );
}
