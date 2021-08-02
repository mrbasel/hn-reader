import { ChakraProvider } from "@chakra-ui/react";

import PostsList from "./components/PostsList";

function App() {
  return (
    <ChakraProvider>
      <PostsList />
    </ChakraProvider>
  );
}
export default App;
