import { Box, Link, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box as="footer" mt="4" p="2" textAlign="center">
      <Text>
        Made by Basel -{" "}
        <Link color="#4fbcff" href="https://github.com/mrbasel/hn-reader">
          Source
        </Link>
      </Text>
    </Box>
  );
}
