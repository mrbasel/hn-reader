import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import Comment from "../interfaces/Comment";
import "../styles/comment.css";

interface PostCommentProps {
  comment: Comment;
  responses?: Comment[];
  isTopLevel?: boolean;
  orginalAuthor: string | undefined;
}

function PostComment(props: PostCommentProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <Box
      border={props.isTopLevel ? "1px solid #333" : ""}
      borderLeft={props.isTopLevel ? "" : "2px solid #333"}
      bgColor="#262626"
      my={props.isTopLevel ? "4" : ""}
      py="3"
      pl="4"
      pr="0.5"
      key={props.comment.id}
    >
      <HStack mb="1" color="gray" onClick={() => setHidden(!hidden)}>
        <Link
          href={"https://news.ycombinator.com/user?id=" + props.comment.user}
        >
          {props.comment.user}
          {props.comment.user === props.orginalAuthor && (
            <Text display="inline" fontWeight="bold" color="blue.400">
              {" "}
              OP
            </Text>
          )}
        </Link>
        <Text>{props.comment.time_ago}</Text>
      </HStack>
      <Text
        className="comment"
        display={hidden ? "none" : "block"}
        dangerouslySetInnerHTML={{ __html: props.comment.content }}
      ></Text>
      <Box className="replies" display={hidden ? "none" : "block"}>
        {props.responses?.map((comment: Comment) => (
          <PostComment
            key={comment.id}
            comment={comment}
            responses={comment.comments}
            orginalAuthor={props.orginalAuthor}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PostComment;
