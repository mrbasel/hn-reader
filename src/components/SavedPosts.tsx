import { Box } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../interfaces/Post";
import { loadSavedPosts } from "../utils";
import PostItem from "./PostItem";

interface SavedPostsProps {}

export default function SavedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Promise.all(fetchPostsData(loadSavedPosts())).then((posts) =>
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

  return (
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      {posts.map((post) => (
        <PostItem post={post} savePost={() => {}} />
      ))}
    </Box>
  );
}
