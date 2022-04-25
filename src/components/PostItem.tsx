import { Box, Flex, Heading, HStack, Link, Text, Icon } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

import Post from "../interfaces/Post";
import { useEffect } from "react";

interface PostItemProps {
  post: Post;
  index?: number;
  showContent?: boolean;
  // isSaved?: boolean;
  // savePost: (postId: number) => void;
}

function PostItem(props: PostItemProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("post")) document.title = `${props.post.title} - HN`;
  }, []);

  return (
    <Flex my="4" p="3" border="1px solid #333" bgColor="#262626">
      {props.index !== undefined && (
        <Heading textAlign="right" mr="6">
          {/* Render empty space if index less than nine */}
          {props.index < 9 && <span>&nbsp;&nbsp;</span>}
          {props.index + 1}
        </Heading>
      )}

      <Flex flexDir="column" justifyContent="space-between" textAlign="left">
        <Heading as="h3" size="sm">
          {props.post.url.includes("http") ? (
            <Link
              _visited={{ color: "dimgrey" }}
              href={
                props.post.url.includes("http")
                  ? props.post.url
                  : `https://news.ycombinator.com/${props.post.url}`
              }
            >
              {props.post.title}
              {"  "}
            </Link>
          ) : (
            <Link
              as={RouterLink}
              to={`/post/${props.post.id}`}
              _visited={{ color: "dimgrey" }}
            >
              {props.post.title}
            </Link>
          )}

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
          {props.post.user && (
            <Text display="inline" color="gray">
              by{" "}
            </Text>
          )}

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
          {props.post.points && (
            <Text color="whiteAlpha.700">{props.post.points} points</Text>
          )}

          {/* Render a Router link only if not in post page, else normal link which points to https://news.ycombinator.com/item?id={id} */}
          {pathname.includes("post") ? (
            <Flex flexDir="row" justify="center" align="center">
              <Link
                color="whiteAlpha.700"
                href={`https://news.ycombinator.com/item?id=${props.post.id}`}
              >
                {props.post.comments_count} comments<span>&nbsp;</span>
              </Link>
              <Icon as={FiExternalLink} color="rgba(255, 255, 255, 0.64)" />
            </Flex>
          ) : props.post.user ? (
            <Link
              as={RouterLink}
              to={`/post/${props.post.id}`}
              color="whiteAlpha.700"
            >
              {props.post.comments_count} comments
            </Link>
          ) : (
            ""
          )}

          {/* <Text
            as="button"
            color="whiteAlpha.700"
            onClick={() => {
              props.savePost(props.post.id);
            }}
          >
            {props.isSaved ? "Unsave" : "Save"}
          </Text> */}
        </HStack>
        {props.post.content && props.showContent && (
          <Text
            className="comment"
            mt="3"
            dangerouslySetInnerHTML={{ __html: props.post.content }}
          ></Text>
        )}
      </Flex>
    </Flex>
  );
}

export default PostItem;
