import useSWR from "swr";
import Post from "../interfaces/Post";
import { PostType } from "../interfaces/PostType";
import { fetcher } from "../utils";

interface usePostsProps {
  postType: PostType;
  pageNumber: number;
}

export function usePosts({ postType, pageNumber }: usePostsProps) {
  const { data, error } = useSWR(
    `https://node-hnapi.herokuapp.com/${postType}?page=${pageNumber}`,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  return {
    posts: (data ?? []) as Post[],
    isLoading: !error && !data,
    error,
  };
}
