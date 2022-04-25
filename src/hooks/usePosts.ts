import useSWR from "swr";
import Post from "../interfaces/Post";
import { PostType } from "../interfaces/PostType";

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

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
    // posts: [],
    isLoading: !error && !data,
    error,
  };
}
