import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import PostItem from "./PostItem";

function PostsList(props: any) {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((res) =>
        Promise.all(
          res.data
            .slice(0, 30)
            .map((id: Number) =>
              axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            )
        )
      )
      .then((data: any) => {
        setPosts(data);
      });
  }, []);

  return (
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      {posts.map((post, i) => (
        <PostItem
          key={post.data.id}
          id={post.data.id}
          index={i + 1}
          link={post.data.url}
          title={post.data.title}
          author={post.data.by}
          points={post.data.score}
          comments={post.data.descendants}
          type={post.data.type}
        />
      ))}
    </Box>
  );
}

export default PostsList;
