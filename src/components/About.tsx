import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About - HN";
  }, []);

  return (
    <Box my="8" p="4" textAlign="left" mx="auto" maxW="600px">
      <Heading>About</Heading>
      <Box mt="4">
        <Text>
          This is a simple Hacker News reader app with a mobile friendly UI and
          dark mode support.
        </Text>
        <Text my="2">Made using TypeScript, React.js and Chakra UI.</Text>
        <Text>
          <Text>
            If you found this app helpful, please consider leaving a star on the{" "}
            <Link color="#4fbcff" href="https://github.com/mrbasel/hn-reader">
              Github repo{" "}
            </Link>{" "}
            😊
          </Text>
        </Text>
      </Box>
    </Box>
  );
}

export default About;
