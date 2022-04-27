import { Box, Center, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import PostComment from "./PostComment";
import PostItem from "./PostItem";
import { useComments } from "../hooks/useComments";
import { Comment } from "../interfaces";
import { Loading } from "./Loading";
import { Error } from "./Error";

function PostComments() {
  let { id } = useParams<{ id: string }>();

  const { post, comments, isLoading, error } = useComments(id);

  if (error) return <Error />;

  if (isLoading) return <Loading />;

  return (
    <Box maxW="960px" mx="auto" mt="8" p={4} color="white">
      <PostItem key={post?.id} post={post!} showContent />

      {post?.comments_count === 0 && (
        <Center h="20vh">
          <Heading size="md">No comments yet</Heading>
        </Center>
      )}

      {comments.map((comment: Comment) => (
        <PostComment
          key={comment.id}
          comment={comment}
          responses={comment.comments}
          orginalAuthor={post.user}
          isTopLevel={true}
        />
      ))}
    </Box>
  );
}

export default PostComments;
