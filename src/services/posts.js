export async function getPosts() {
    const response = await fetch('https://json-server-hackernoon.herokuapp.com/posts');
    const data = await response.json();
    return data; 
}