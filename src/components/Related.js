const Related = ({ related, hackernoon_url, profile }) => {
    return (
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
    )
}

export default Related
