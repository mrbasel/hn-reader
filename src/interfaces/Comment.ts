
export default interface Comment {
    id: number;
    level: number;
    user: string;
    time_ago: string;
    content: string;
    comments: Comment[];
}