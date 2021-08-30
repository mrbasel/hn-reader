import { Flex, Heading, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <Flex
      as="nav"
      justifyContent="space-around"
      alignItems="center"
      pb="3"
      mt="2"
      borderBottom="1px solid orange"
    >
      <Heading size="lg">
        <Link as={RouterLink} to="/top">
          Hacker News
        </Link>
      </Heading>
      <Box>
        <Link as={RouterLink} to="/ask" mx="4">
          Ask
        </Link>
        <Link as={RouterLink} to="/show" mx="4">
          Show
        </Link>
        <Link as={RouterLink} to="/newest" mx="4">
          New
        </Link>
        <Link as={RouterLink} to="/about" mx="4">
          About
        </Link>
      </Box>
    </Flex>
  );
}

export default Header;
