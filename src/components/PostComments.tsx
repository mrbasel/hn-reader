import { Box, Center, Heading, HStack, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../interfaces/Post";
import PostItem from "./PostItem";

interface Comment {
  id: number;
  text: string;
  time: number;
}

interface ParamTypes {
  commentIds: Array<{ id: number; commentIds: number[] }>;
}

function PostComments(props: any) {
  let { id } = useParams<{ id: string }>();
  const post = props.commentIds.find(
    (elem: any) => elem.id === parseInt(id)
  ).commentIds;

  const [comments, setComments] = useState<Comment[]>([]);
  const [postData, setPost] = useState<Post>();
  useEffect(() => {
    if (post) {
      axios
        .get<Post>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((res: any) => {
          setPost(res.data);
        });
      Promise.all(
        post.map((id: number) =>
          axios.get<Comment>(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          )
        )
      ).then((data: any[]) => {
        setComments(data.map((res) => res.data));
      });
    }
  }, []);

  if (!post)
    return (
      <Center h="80vh">
        <Heading size="md">No comments yet</Heading>
      </Center>
    );

  // TODO: render html using a safer way
  // TODO: Show comments in lower levels
  return (
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      <Box border="1px solid #333" my="4" p="3">
        <Heading size="md">
          <Link href={postData?.url}>{postData?.title}</Link>
        </Heading>
        <HStack mt="1.5" color="grey">
          <Text>{postData?.score} points</Text>
          <Link href={"https://news.ycombinator.com/user?id=" + postData?.by}>
            by {postData?.by}
          </Link>
          <Text>{postData?.descendants} comments</Text>
        </HStack>
      </Box>

      {comments.map((comment: Comment) => (
        <Box border="1px solid #333" my="4" p="3" key={comment.id}>
          <Text dangerouslySetInnerHTML={{ __html: comment.text }}>
            {/* {comment.text} */}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default PostComments;
