import { Box } from "@chakra-ui/react";
import PostItem from "./PostItem";

function PostsList(props: any) {
  return (
    <Box maxW="960px" mt="8" p={4} color="white">
      {[...Array(3)].map((e, i) => (
        <PostItem
          title="ac placerat vestibulum lectus mauris ultrices eros in cursus turpis"
          author={`internet_guy_${i}`}
          points={20}
          comments={4}
        />
      ))}
    </Box>
  );
}

export default PostsList;
