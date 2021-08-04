import { Box, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";

function PostItem(props: any) {
  return (
    <Flex my="4" p="3" border="1px solid #333">
      <Heading>{props.index}</Heading>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        ml="6"
        textAlign="left"
      >
        <Heading as="h3" size="md">
          <Link href={props.link}>{props.title}</Link>
        </Heading>
        <Box>
          <Text display="inline" mr="2" fontWeight="bold" color="gray">
            /{props.type}
          </Text>
          <Text display="inline" color="gray">
            by {props.author}
          </Text>
        </Box>
        <HStack spacing="4">
          <Text color="whiteAlpha.700">{props.points} points</Text>
          <Link
            href={`https://news.ycombinator.com/item?id=${props.id}`}
            color="whiteAlpha.700"
          >
            {props.comments} comments
          </Link>
          <Text color="whiteAlpha.700">Share</Text>
        </HStack>
      </Flex>
    </Flex>
  );
}

export default PostItem;
