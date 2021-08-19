import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import Comment from "../interfaces/Comment";

interface PostCommentProps {
  comment: Comment;
  responses?: Comment[];
  isTopLevel?: boolean;
}

function PostComment(props: PostCommentProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <Box
      border={props.isTopLevel ? "1px solid #333" : ""}
      bgColor="#262626"
      my={props.isTopLevel ? "4" : ""}
      p="3"
      key={props.comment.id}
    >
      <HStack mb="1" color="gray" onClick={() => setHidden(!hidden)}>
        <Link
          href={"https://news.ycombinator.com/user?id=" + props.comment.user}
        >
          {props.comment.user}
        </Link>
        <Text>{props.comment.time_ago}</Text>
      </HStack>
      <Text
        dangerouslySetInnerHTML={{ __html: props.comment.content }}
        display={hidden ? "none" : "block"}
      ></Text>
      <Box className="replies" display={hidden ? "none" : "block"}>
        {props.responses?.map((comment: Comment) => (
          <PostComment
            key={comment.id}
            comment={comment}
            responses={comment.comments}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PostComment;
