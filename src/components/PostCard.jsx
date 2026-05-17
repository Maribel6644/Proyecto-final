function PostCard({ post, deletePost, editPost }) {
  return (
    <div className="card pinterest-item">

      <img
        src={post.image}
        className="card-img-top"
        alt={post.title}
      />

      <div className="card-body">

        <h5>{post.title}</h5>

        <p>
          {post.tags?.map((tag, index) => (
            <span
              key={index}
              className="tag"
            >
              #{tag}
            </span>
          ))}
        </p>

        <small className="text-muted">
          By {post.user}
        </small>

        <div className="mt-3 d-flex gap-2">

          <button
            className="btn btn-danger"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>

          <button
            className="btn btn-warning"
            onClick={() => editPost(post)}
          >
            Edit
          </button>

        </div>

      </div>
    </div>
  )
}

export default PostCard