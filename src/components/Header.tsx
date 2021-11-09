import {
  Flex,
  Heading,
  Box,
  Link,
  useMediaQuery,
  Icon,
  IconButton,
  MenuDivider,
} from "@chakra-ui/react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function Header() {
  const [isSmallerThan800] = useMediaQuery("(max-width: 800px)");
  const history = useHistory();
  const { pathname } = useLocation();
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
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={HiMenu} />}
                variant="outline"
              />
              <MenuList backgroundColor="#262626">
                <MenuItem
                  color={pathname.includes("top") ? "orange" : ""}
                  onClick={() => history.push("/top")}
                >
                  Top
                </MenuItem>
                <MenuItem
                  color={pathname.includes("ask") ? "orange" : ""}
                  onClick={() => history.push("/ask")}
                >
                  Ask
                </MenuItem>
                <MenuItem
                  color={pathname.includes("show") ? "orange" : ""}
                  onClick={() => history.push("/show")}
                >
                  Show
                </MenuItem>
                <MenuItem
                  color={pathname.includes("newest") ? "orange" : ""}
                  onClick={() => history.push("/newest")}
                >
                  New
                </MenuItem>
                <MenuItem
                  color={pathname.includes("jobs") ? "orange" : ""}
                  onClick={() => history.push("/jobs")}
                >
                  Jobs
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  color={pathname.includes("about") ? "orange" : ""}
                  onClick={() => history.push("/about")}
                >
                  About
                </MenuItem>
              </MenuList>
            </Menu>
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
              <Link as={RouterLink} to="/jobs" mx="4">
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
          <Link as={RouterLink} to="/saved" mx="4">
            Saved
          </Link>

          {/* <Link as={RouterLink} to="/settings" mx="4">
            <Button>Settings</Button>
          </Link> */}
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
