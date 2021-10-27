import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About - HN"
  }, []);

  return (
    <Box mt="8" textAlign="center">
      <Heading>About</Heading>
      <Box mt="4" fontSize="lg">
        <Text>
          This is a simple Hacker News reader app with a mobile friendly UI and
          dark mode support.
        </Text>
        <Text>Made using TypeScript, React.js and Chakra UI.</Text>
        <Text>
          <Link color="#4fbcff" href="https://github.com/mrbasel/hn-reader">
            Source Code
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default About;
