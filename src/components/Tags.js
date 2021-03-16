const Tags = ( { posts, hackernoon_url } ) => {
    return (
        <div className="tags">
            <h4 className="line-title">Tags</h4>
            <div className="tags-cont">
                {posts.tags !== undefined && posts.tags.map((tag) => {
                    return <a href={`${hackernoon_url}tagged/${tag}`}>{tag}</a>
                })}
            </div>
        </div>
    )
}

export default Tags
