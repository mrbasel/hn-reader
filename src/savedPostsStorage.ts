
const loadPosts = () => {
    const postsString = localStorage.getItem("posts");
    let postsIds: number[] = [];
    if (postsString) postsIds = JSON.parse(postsString);

    return postsIds;
};

const addPost = (postId: number) => {
    const postIds = loadPosts();

    if (!postIds.includes(postId))
        postIds.push(postId);
    localStorage.setItem("posts", JSON.stringify(postIds));
}

const addPosts = (postIds: number[]) => {

}

const removePost = (postId: number) => {
    let postIds = loadPosts();

    if (postIds.includes(postId))
        postIds = postIds.filter(id => id != postId);
    localStorage.setItem("posts", JSON.stringify(postIds));
}

const removeAllPosts = () => {
    localStorage.setItem("posts", JSON.stringify([]));
}

const savedPostsStorage = {
    loadPosts,
    addPost,
    // addPosts,
    removePost,
    removeAllPosts
}

export default savedPostsStorage;