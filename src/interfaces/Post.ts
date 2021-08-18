export interface Post {
    id: number;
    title: string;
    points: number;
    user: string;
    text: string;
    comments_count: number;
    type: string;
    time_ago: number;
    url: string;
    domain: string;
}