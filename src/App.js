import { useEffect, useState } from 'react';
import { getPosts } from './services/posts'

function App() {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const Posts = async () => {
            const posts = await getPosts();
            setPosts(posts);
        }
        Posts();
    }, [])

    return (
        <div className="App">
        <h1>{posts.title}</h1>
            {/* This can be sanitized but as this come from an internal API I thought it may be innecesary to install another library just for that and not make this test mini app bigger*/}
            <div dangerouslySetInnerHTML={{__html: posts.markup}}></div>
        </div>
    );
}

export default App;
