import { Box, Link, Text } from "@chakra-ui/react";

function Footer(props: any) {
  return (
    <Box mt="4" p="4" borderTop="1px solid orange">
      <Text textAlign="center">
        Made with React.js 💙 By{" "}
        <Link color="blue.400" href="https://github.com/mrbasel">
          Basel
        </Link>{" "}
        |{" "}
        <Link color="blue.400" href="https://github.com/mrbasel/hn-reader">
          Source
        </Link>
      </Text>
    </Box>
  );
}

export default Footer;
