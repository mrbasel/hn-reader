import useSWR from "swr";
import { Comment } from "../interfaces";
import Post from "../interfaces/Post";
import { fetcher } from "../utils";

export function useComments(id: string) {
  const { data: res, error } = useSWR(
    `https://node-hnapi.herokuapp.com/item/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
    }
  );

  const data = res as any;

  return {
    post: data as Post,
    comments: (data?.comments ?? []) as Comment[],
    isLoading: !error && !data,
    error,
  };
}
