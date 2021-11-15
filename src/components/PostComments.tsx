import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "../interfaces/Post";
import Comment from "../interfaces/Comment";
import PostComment from "./PostComment";
import PostItem from "./PostItem";
import savedPostsStorage from "../savedPostsStorage";

interface PostCommentsProps {
  setSavedPosts: (postIds: number[]) => void;
  savedPosts: number[];
}

function PostComments(props: PostCommentsProps) {
  let { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [postData, setPost] = useState<Post>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://node-hnapi.herokuapp.com/item/${id}`
      );
      setPost(res.data);
      setComments(res.data.comments);
    };

    fetchData();
  }, [id]);

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
      <PostItem
        key={postData?.id}
        post={postData!}
        isSaved={
          postData !== undefined && props.savedPosts.includes(postData.id)
        }
        savePost={() => {
          if (postData === undefined) return;

          let posts: number[] = savedPostsStorage.loadPosts();
          if (postData !== undefined && props.savedPosts.includes(postData.id)) {
            savedPostsStorage.removePost(postData.id);
            posts = posts.filter((id) => id !== postData.id);
          } else {
            savedPostsStorage.addPost(postData.id);
            posts.push(postData.id);
          }
          props.setSavedPosts(posts);
        }}
        showContent
      />

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
