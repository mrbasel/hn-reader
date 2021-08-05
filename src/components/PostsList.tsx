import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

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
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios
      .get<Number[]>("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) =>
        Promise.all(
          res.data
            .slice(0, 10)
            .map((id: Number) =>
              axios.get<Post>(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json`
              )
            )
        )
      )
      .then((data: AxiosResponse[]) => {
        setPosts(data.map((post) => post.data));
      });
  }, []);

  return (
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      {posts.map((post, i) => (
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
