import { useEffect, useState } from 'react';
import { getPosts } from './services/posts';
import './hackernoon.scss'

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
            {/* This can be sanitized but as this come from an internal API I thought it may be innecesary to install another library just for that and not make this test mini app bigger*/}
            <div className="post-body grid-container">
                <div className="author-profile">
                    <img src={profile.avatar} alt="" width="50px" height="50px" className="author-profile-img" />
                    <p className="green-link-cont author-profile-at"><a href={`${hackernoon_url}u/${profile.handle}`} className="green-link">@{profile.handle}</a></p>
                    <p className="author-profile-name">{profile.displayName}</p>
                    <p className="author-profile-bio">{profile.bio}</p>
                    <div className="profile-social">
                        <a href={`https://twitter.com/${profile.twitter}`}>
                            <img className="authro-profile-social-icon" src="https://hackernoon.com/social-icons/twitter-new.png" width="20" height="20" alt="twitter"/>
                        </a>
                        <a href={`https://github.com/${profile.github}`}>
                            <img className="authro-profile-social-icon" src="https://hackernoon.com/social-icons/github-new.png" width="20" height="20" alt="github"/>
                        </a>
                    </div>
                </div>
                <div className="post-content" dangerouslySetInnerHTML={{__html: posts.markup}}></div>
                <div className="reactions"></div>
            </div>
            {/* TODO: Separate related into a component */}
            <div className="related-posts">
                <h4 className="line-title">RELATED</h4>
                <div className="related-posts-cont">
                    {related.map((rel, index) => {
                        if(rel !== undefined){
                            return (
                                <article className="related-post" key={index}>
                                    {rel.type !== undefined && rel.type === 'tag' ? 
                                    <div className="related-post-inner">
                                        <p className="related-post-title"><a href={rel.link} className="green-link">{rel.text}</a></p>
                                        <a href={rel.link}><img className="related-image" src={rel.image} alt=""/></a>
                                        <div className="rel-meta">
                                            <div className="meta-desc">
                                                <p>{rel.companyName}</p>
                                            </div>
                                            <div className="time"></div>
                                        </div>
                                    </div> : 
                                    <div className="related-post-inner">
                                        <p className="related-post-title"><a href={`${hackernoon_url}${rel.slug}`} className="green-link">{rel.title}</a></p>
                                        <a href={`${hackernoon_url}${rel.slug}`}><img className="related-image" src={rel.mainImage} alt=""/></a>
                                        <div className="rel-meta">
                                            <div className="meta-desc">
                                                <img src={rel.profile.avatar} alt={rel.profile.handle} width="50" height="50" />
                                                <div className="rel-meta-profile">
                                                    <p className="green-link-cont"><a className="green-link" href={`${hackernoon_url}u/${profile.handle}`}>{`@${rel.profile.handle}`}</a></p>
                                                    <p>{rel.profile.displayName}</p>
                                                </div>
                                            </div>
                                            <div className="time">
                                                <p className="estimated-time">
                                                    {rel.estimatedTime !== undefined && `${rel.estimatedTime}min`}
                                                </p>
                                                <p className="rel-date">
                                                    {new Date(rel.publishedAt*1000).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>}
                                </article>
                            );
                        }
                        return ''
                    })}
                </div>
            </div>
            <div className="tags">
                <h4 className="line-title">Tags</h4>
                <div className="tags-cont">
                    {posts.tags !== undefined && posts.tags.map((tag) => {
                        return <a href={`${hackernoon_url}tagged/${tag}`}>{tag}</a>
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
