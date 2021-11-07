

export function capitalizeFirstLetter(word: String): String {
    return word[0].toUpperCase() + word.substring(1, word.length);
}

export function loadSavedPosts() {
    const postsString = localStorage.getItem("posts");
    let postsIds: number[] = [];
    if (postsString) postsIds = JSON.parse(postsString);

    return postsIds;
};