const Author = ( { hackernoon_url, profile } ) => {
    return (
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
    )
}

export default Author
