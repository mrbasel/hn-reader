import { Comment } from "@/interfaces/Comment";

export default interface Post {
  id: number;
  title: string;
  points: number;
  user: string;
  content: string;
  comments_count: number;
  type: string;
  time_ago: number;
  url: string;
  domain: string;
  comments?: Comment[];
}
