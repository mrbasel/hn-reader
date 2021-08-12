import { Box, Flex, Heading, HStack, Link, Text } from "@chakra-ui/react";
import formatDistance from "date-fns/formatDistance";

function findTimePassed(unixTime: number): String {
  const baseDate = new Date(unixTime * 1000);
  const currentDate = new Date();

  return formatDistance(currentDate, baseDate).replaceAll("about", "") + " ago";
}

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
          <Text display="inline" color="gray">by </Text>
          <Link href={props.authorPage} color="gray">
            {props.author}
          </Link>
          <Text display="inline" ml="1" color="gray">
            {findTimePassed(props.unixTime)}
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
        </HStack>
      </Flex>
    </Flex>
  );
}

export default PostItem;
