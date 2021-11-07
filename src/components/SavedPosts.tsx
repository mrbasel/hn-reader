import { List } from "@chakra-ui/layout";
import { loadSavedPosts } from "../utils";

interface SavedPostsProps {}

export default function SavedPosts() {
  return (
    <ul>
      {loadSavedPosts().map((i) => (
        <li>{i}</li>
      ))}
    </ul>
  );
}
