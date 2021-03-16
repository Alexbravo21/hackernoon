import { useEffect, useState } from 'react';
import { getPosts } from './services/posts';
import Author from './components/Author';
import Related from './components/Related';
import Tags from './components/Tags';

import './hackernoon.scss';

const hackernoon_url = 'https://hackernoon.com/';

const App = () => {
    
    const [posts, setPosts] = useState([]);
    const [date, setDate] = useState([]);
    const [profile, setProfile] = useState([]);
    const [related, setRelated] = useState([]);
    
    useEffect(() => {
        const Posts = async () => {
            const posts = await getPosts();
            setPosts(posts);
            let provisional_date = new Date(posts.publishedAt*1000).toDateString();
            setDate(provisional_date);
            setProfile(posts.profile);
            setRelated(posts.relatedStories);
        }
        Posts();
    }, [])


    return (
        <div className="App">
            <h1>{posts.title}</h1>
            <div className="meta">
                <p>{date}</p>
            </div>
            <img className="post-image" src={posts.mainImage} alt=""/>
            <div className="post-body grid-container">
            <Author hackernoon_url={hackernoon_url} profile={profile} />
                {/* This can be sanitized but as this come from an internal API I thought it may be innecesary to install another library*/}
                <div className="post-content" dangerouslySetInnerHTML={{__html: posts.markup}}></div>
                <div className="reactions"></div>
            </div>
            <Related related={related} hackernoon_url={hackernoon_url} profile={profile} />
            <Tags posts={posts} hackernoon_url={hackernoon_url} />
        </div>
    );
}

export default App;
