import Post from "@/interfaces/Post";
import useSWR from "swr";
import { fetcher } from "utils";
import { PostType } from "../interfaces";

interface usePostsProps {
  postType: PostType;
  pageNumber: 1 | 2;
}

export function usePosts({ postType, pageNumber }: usePostsProps) {
  const { data : pageOneData, error: pageOneError } = useSWR<Post[]>(
    `https://node-hnapi.herokuapp.com/${postType}?page=1`,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );
    const { data : pageTwoData, error: pageTwoError } = useSWR<Post[]>(
    `https://node-hnapi.herokuapp.com/${postType}?page=2`,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  const posts = pageNumber === 1 ? pageOneData : pageTwoData;
  const error = pageNumber === 1 ? pageOneError : pageTwoError;

  return {
    posts: posts ?? [],
    isLoading: !error && !posts,
    error,
  };
}
