import {
  Box,
  Center,
  Heading,
  HStack,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../interfaces/Post";
import Comment from "../interfaces/Comment";
import PostComment from "./PostComment";

interface ParamTypes {
  commentIds: Array<{ id: number; commentIds: number[] }>;
}

function PostComments(props: any) {
  let { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [postData, setPost] = useState<Post>();

  useEffect(() => {
    axios
      .get<Comment[]>(`https://node-hnapi.herokuapp.com/item/${id}`)
      .then((res: AxiosResponse) => {
        setPost(res.data);
        setComments(res.data.comments);
      });
  }, []);

  // Show loading spinner if the post or comments havent loaded yet
  if (comments.length === 0 && !postData) {
    return (
      <Center height="90vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      <Box border="1px solid #333" bgColor="#262626" my="8" p="3">
        <Heading size="md">
          <Link href={postData?.url}>{postData?.title}</Link>
        </Heading>
        <HStack mt="1.5" color="grey">
          <Text>{postData?.points} points</Text>
          <Link href={"https://news.ycombinator.com/user?id=" + postData?.user}>
            by {postData?.user}
          </Link>
          <Text>{postData?.comments_count} comments</Text>
        </HStack>
        {postData?.text && (
          <Text
            mt="3"
            dangerouslySetInnerHTML={{ __html: postData.text }}
          ></Text>
        )}
      </Box>

      {postData?.comments_count === 0 && (
        <Center h="20vh">
          <Heading size="md">No comments yet</Heading>
        </Center>
      )}

      {comments.map((comment: Comment) => (
        <PostComment
          key={comment.id}
          comment={comment}
          responses={comment.comments}
          isTopLevel={true}
        />
      ))}
    </Box>
  );
}

export default PostComments;
