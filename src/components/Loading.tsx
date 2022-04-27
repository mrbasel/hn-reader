import { Center, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Center height="90vh">
      <Spinner size="xl" />
    </Center>
  );
}
