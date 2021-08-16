import { Box, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import { findTimePassed } from "../utils";

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
        <Heading as="h3" size="sm">
          <Link href={props.link}>{props.title}</Link>
        </Heading>
        <Box>
          <Text display="inline" color="gray">
            by{" "}
          </Text>
          <Link href={props.authorPage} color="gray">
            {props.author}
          </Link>
          <Text display="inline" ml="1" color="gray">
            {findTimePassed(props.unixTime)}
          </Text>
        </Box>
        <HStack spacing="4">
          <Text color="whiteAlpha.700">{props.points} points</Text>
          {props.children}
        </HStack>
      </Flex>
    </Flex>
  );
}

export default PostItem;
