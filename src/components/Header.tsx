import {
  Flex,
  Heading,
  Box,
  Link,
  useMediaQuery,
  Icon,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";

function Header() {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
  return (
    <Box as="nav" borderBottom="1px solid orange">
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        pb="3"
        mt="2"
        maxW="1500px"
        mx="auto"
      >
        <Box position="absolute" left="3">
          {isSmallerThan800 ? (
            <Icon as={HiMenu} fontSize="3xl" />
          ) : (
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
              <Link as={RouterLink} to="/newest" mx="4">
                Jobs
              </Link>
            </Box>
          )}
        </Box>

        <Heading>
          <Link as={RouterLink} to="/top">
            {isSmallerThan800 ? "HN" : "HN News"}
          </Link>
        </Heading>
        <Box position="absolute" right="3">
          <Link as={RouterLink} to="/about" mx="4">
            About
          </Link>
          <Link as={RouterLink} to="/settings" mx="4">
            <Button>Settings</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
