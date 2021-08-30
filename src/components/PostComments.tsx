import { Box, Center, Heading, Link, Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../interfaces/Post";
import Comment from "../interfaces/Comment";
import PostComment from "./PostComment";
import PostItem from "./PostItem";

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
      <PostItem key={postData?.id} post={postData!} />

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
          orginalAuthor={postData?.user}
          isTopLevel={true}
        />
      ))}
    </Box>
  );
}

export default PostComments;
