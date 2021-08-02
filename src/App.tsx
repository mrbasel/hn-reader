import React, { useState } from "react";
import { ChakraProvider, Heading } from "@chakra-ui/react";

function App() {
  return <ChakraProvider>
    <Heading textAlign="center">Hello World</Heading>
  </ChakraProvider>;
}
export default App;
