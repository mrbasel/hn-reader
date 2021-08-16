export interface Post {
    id: Number;
    url: string;
    title: string;
    by: string;
    score: Number;
    descendants: Number;
    type: string;
    time: Number;
    kids: number[];
}