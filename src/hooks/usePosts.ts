import Post from "@/interfaces/Post";
import useSWR from "swr";
import { fetcher } from "utils";
import { PostType } from "../interfaces";

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
