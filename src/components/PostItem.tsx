import { Box, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import Post from "../interfaces/Post";

interface PostItemProps {
  post: Post;
  index: number;
  children: React.ReactNode;
}

function PostItem(props: PostItemProps) {
  return (
    <Flex my="4" p="3" border="1px solid #333" bgColor="#262626">
      <Heading textAlign="right">{props.index + 1}</Heading>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        ml="6"
        textAlign="left"
      >
        <Heading as="h3" size="sm">
          <Link href={props.post.url}>
            {props.post.title}
            {"  "}
          </Link>
          {props.post.domain && (
            <Link
              href={"//" + props.post.domain}
              display="inline"
              color="gray.400"
            >
              ({props.post.domain})
            </Link>
          )}
        </Heading>
        <Box>
          <Text display="inline" color="gray">
            by{" "}
          </Text>
          <Link
            href={"https://news.ycombinator.com/user?id=" + props.post.user}
            color="gray"
          >
            {props.post.user}
          </Link>
          <Text display="inline" ml="1" color="gray">
            {" " + props.post.time_ago}
          </Text>
        </Box>
        <HStack spacing="4">
          <Text color="whiteAlpha.700">{props.post.points} points</Text>
          {props.children}
        </HStack>
      </Flex>
    </Flex>
  );
}

export default PostItem;
